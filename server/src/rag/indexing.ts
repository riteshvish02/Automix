// ============================================================
// INDEXING PHASE — triggered on PDF upload
// ============================================================

import { generateEmbedding, generateSparseVector } from './embeddings.js'
import { qdrantClient } from './vectorDB/qdrant.js'
import { neo4jDriver } from './graphDB/neo4j.js'
import { extractEntitiesAndRelations } from './nlp/entityExtractor.js'

export const indexPDFDocument = async (
  pdfPath,
  userId,
  documentId,
  documentTitle
) => {
  try {
    // Step 1: Extract text from PDF
    const fullText = await extractTextFromPDF(pdfPath)
    
    // Step 2: Chunk into semantic units
    const chunks = createSemanticChunks(fullText, {
      size: 300,    // words
      overlap: 50   // words
    })
    
    // Step 3: PARALLEL processing — don't wait sequentially
    const [vectorResults, graphResults, sparseResults] = await Promise.all([
      indexToQdrantDenseVectors(chunks, userId, documentId),
      indexToNeo4jGraph(chunks, userId, documentId, documentTitle),
      indexToQdrantSparseVectors(chunks, userId, documentId)
    ])
    
    console.log(`✓ Indexed ${chunks.length} chunks`)
    console.log(`  - Dense vectors: ${vectorResults.count}`)
    console.log(`  - Graph nodes: ${graphResults.nodeCount}`)
    console.log(`  - Sparse vectors: ${sparseResults.count}`)
    
    // Step 4: Store indexing metadata (for cleanup later)
    await saveIndexMetadata(userId, documentId, {
      chunks: chunks.length,
      qdrantIds: vectorResults.ids,
      neo4jNodeIds: graphResults.nodeIds,
      indexedAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })
    
    return {
      status: 'success',
      documentId,
      chunksIndexed: chunks.length
    }
  } catch (error) {
    console.error('Indexing failed:', error)
    throw error
  }
}

// ============================================================
// 1. DENSE VECTORS → Qdrant (semantic similarity search)
// ============================================================

const indexToQdrantDenseVectors = async (chunks, userId, documentId) => {
  const points = await Promise.all(
    chunks.map(async (chunk, idx) => {
      const embedding = await generateEmbedding(chunk.text)
      
      return {
        id: `${documentId}_chunk_${idx}`,
        vector: embedding,
        payload: {
          userId,
          documentId,
          chunkIndex: idx,
          text: chunk.text,
          metadata: chunk.metadata, // { pageNum, section, etc }
          chunkType: 'semantic'
        }
      }
    })
  )
  
  // Upsert to Qdrant — creates collection if needed
  await qdrantClient.upsert('documents-dense', {
    wait: true,
    points
  })
  
  return { count: points.length, ids: points.map(p => p.id) }
}

// ============================================================
// 2. ENTITIES + RELATIONSHIPS → Neo4j (graph queries)
// ============================================================

const indexToNeo4jGraph = async (chunks, userId, documentId, docTitle) => {
  const session = neo4jDriver.session()
  let nodeCount = 0
  const nodeIds = []
  
  try {
    for (const chunk of chunks) {
      // Extract entities and relations from this chunk
      const { entities, relations } = await extractEntitiesAndRelations(
        chunk.text
      )
      
      // Create nodes for each entity
      for (const entity of entities) {
        const result = await session.run(
          `MERGE (e:Entity {id: $id})
           SET e.name = $name,
               e.type = $type,
               e.label = $label
           RETURN e.id as id`,
          {
            id: `${documentId}_entity_${entity.id}`,
            name: entity.name,
            type: entity.type,
            label: entity.label
          }
        )
        
        nodeIds.push(result.records[0].get('id'))
        nodeCount++
      }
      
      // Create relationships
      for (const relation of relations) {
        await session.run(
          `MATCH (e1:Entity {id: $from})
           MATCH (e2:Entity {id: $to})
           CREATE (e1)-[r:RELATES_TO {type: $relType, 
                                       context: $context,
                                       chunkId: $chunkId}]->(e2)`,
          {
            from: `${documentId}_entity_${relation.from}`,
            to: `${documentId}_entity_${relation.to}`,
            relType: relation.type,
            context: relation.context,
            chunkId: chunk.id
          }
        )
      }
      
      // Also create MENTIONS relationship from document to entities
      for (const entity of entities) {
        await session.run(
          `MATCH (doc:Document {id: $docId})
           MATCH (e:Entity {id: $entityId})
           CREATE (doc)-[m:MENTIONS {
             chunkIndex: $chunkIdx,
             confidence: $conf
           }]->(e)`,
          {
            docId: documentId,
            entityId: `${documentId}_entity_${entity.id}`,
            chunkIdx: chunk.index,
            conf: entity.confidence
          }
        )
      }
    }
    
    return { nodeCount, nodeIds }
  } finally {
    await session.close()
  }
}

// ============================================================
// 3. SPARSE VECTORS → Qdrant (exact term matching)
// ============================================================

const indexToQdrantSparseVectors = async (chunks, userId, documentId) => {
  const points = await Promise.all(
    chunks.map(async (chunk, idx) => {
      // BM25 gives us sparse vector (non-zero dims for important terms)
      const sparseVector = await generateSparseVector(chunk.text, {
        method: 'bm25',
        topK: 50  // Keep only top 50 term dimensions
      })
      
      return {
        id: `${documentId}_sparse_${idx}`,
        vector: sparseVector,
        payload: {
          userId,
          documentId,
          chunkIndex: idx,
          text: chunk.text,
          chunkType: 'sparse'
        }
      }
    })
  )
  
  // Store in same Qdrant collection (or separate, depending on setup)
  await qdrantClient.upsert('documents-sparse', {
    points
  })
  
  return { count: points.length }
}

// ============================================================
// RETRIEVAL PHASE — triggered on user message
// ============================================================

export const retrieveRelevantContext = async (
  userQuery,
  userId,
  options = {}
) => {
  const {
    documentIds = [],  // which files are attached in this message
    chatHistory = [],
    useCompression = true
  } = options
  
  // STEP 1: Classify query type
  const queryType = await classifyQueryType(userQuery, chatHistory)
  // Returns: 'semantic' | 'relational' | 'exact' | 'hybrid'
  
  // STEP 2: Route to appropriate retriever(s)
  let results = []
  
  if (queryType === 'semantic' || queryType === 'hybrid') {
    results.push(
      await retrieveSemanticResults(userQuery, userId, documentIds, chatHistory)
    )
  }
  
  if (queryType === 'relational' || queryType === 'hybrid') {
    results.push(
      await retrieveGraphResults(userQuery, userId, documentIds)
    )
  }
  
  if (queryType === 'exact' || queryType === 'hybrid') {
    results.push(
      await retrieveSparseResults(userQuery, userId, documentIds)
    )
  }
  
  // STEP 3: Merge & rerank across all retrievers
  const merged = mergeRetrievalResults(results)
  const reranked = await rerankChunks(userQuery, merged, 5)
  
  // STEP 4: Compress if needed
  if (useCompression) {
    return await compressChunks(userQuery, reranked)
  }
  
  return reranked
}

// ============================================================
// SEMANTIC RETRIEVAL (your existing system)
// ============================================================

const retrieveSemanticResults = async (
  question,
  userId,
  documentIds,
  chatHistory
) => {
  // Rewrite query (your existing code)
  const rewrittenQueries = await smartQueryRewrite(question, chatHistory)
  
  // Hybrid search: dense + sparse combined
  const candidates = await Promise.all(
    rewrittenQueries.map(async (query) => {
      const denseEmbedding = await generateEmbedding(query)
      const sparseVector = await generateSparseVector(query, {method:'bm25'})
      
      // Hybrid search in Qdrant
      const denseResults = await qdrantClient.search('documents-dense', {
        vector: denseEmbedding,
        limit: 20,
        filter: {
          must: [
            { key: 'userId', match: { value: userId } },
            documentIds.length > 0 
              ? { key: 'documentId', match: { any: documentIds } }
              : {}
          ].filter(Boolean)
        }
      })
      
      const sparseResults = await qdrantClient.search('documents-sparse', {
        vector: sparseVector,
        limit: 20,
        filter: {
          must: [
            { key: 'userId', match: { value: userId } },
            documentIds.length > 0 
              ? { key: 'documentId', match: { any: documentIds } }
              : {}
          ].filter(Boolean)
        }
      })
      
      // Normalize and merge scores (dense at 0.7 weight, sparse at 0.3)
      const merged = mergeScores(denseResults, sparseResults, {
        denseWeight: 0.7,
        sparseWeight: 0.3
      })
      
      return merged
    })
  )
  
  return deduplicateChunks(candidates)
}

// ============================================================
// GRAPH RETRIEVAL (relational queries)
// ============================================================

const retrieveGraphResults = async (userQuery, userId, documentIds) => {
  const session = neo4jDriver.session()
  
  try {
    // Extract key entities from query
    const { entities: queryEntities } = await extractEntitiesAndRelations(
      userQuery
    )
    
    if (queryEntities.length === 0) return []
    
    // Cypher query: find related entities + their context chunks
    const cypher = `
      MATCH (query_entity:Entity)-[r:RELATES_TO]->(related:Entity)
      WHERE query_entity.name =~ $entityName
      OPTIONAL MATCH (d:Document)-[m:MENTIONS]->(related)
      WHERE d.id IN $docIds
      RETURN 
        related.name as entityName,
        collect(r.type) as relationTypes,
        collect(d.id) as mentionedInDocs,
        count(m) as mentionCount
      ORDER BY mentionCount DESC
      LIMIT 10
    `
    
    const result = await session.run(cypher, {
      entityName: `(?i).*${queryEntities[0].name}.*`,
      docIds: documentIds
    })
    
    // Convert graph results to chunk format
    const graphChunks = result.records.map((record, idx) => ({
      id: `graph_result_${idx}`,
      text: `${record.get('entityName')} [${record.get('relationTypes').join(', ')}]`,
      score: 0.8,
      source: 'graph',
      relationType: record.get('relationTypes')[0]
    }))
    
    return graphChunks
  } finally {
    await session.close()
  }
}

// ============================================================
// EXACT SEARCH (term-based)
// ============================================================

const retrieveSparseResults = async (userQuery, userId, documentIds) => {
  const sparseVector = await generateSparseVector(userQuery, {method:'bm25'})
  
  const results = await qdrantClient.search('documents-sparse', {
    vector: sparseVector,
    limit: 10,
    filter: {
      must: [
        { key: 'userId', match: { value: userId } },
        documentIds.length > 0 
          ? { key: 'documentId', match: { any: documentIds } }
          : {}
      ].filter(Boolean)
    }
  })
  
  return results.map(r => ({
    ...r,
    source: 'sparse'
  }))
}

// ============================================================
// QUERY CLASSIFICATION (decides which path to take)
// ============================================================

const classifyQueryType = async (query, chatHistory) => {
  const queries = {
    relational: [
      'kya relation hai',
      'kaise connected hain',
      'link kya hai',
      'what connects',
      'relationship'
    ],
    exact: [
      'exactly find',
      'specific term',
      'exact word',
      'literal'
    ]
  }
  
  const lowerQuery = query.toLowerCase()
  
  // Simple heuristic (replace with ML model for production)
  if (queries.relational.some(q => lowerQuery.includes(q))) {
    return 'relational'
  }
  if (queries.exact.some(q => lowerQuery.includes(q))) {
    return 'exact'
  }
  
  // Default hybrid (semantic + sparse combo)
  return 'hybrid'
}

// ============================================================
// RESULT MERGING
// ============================================================

const mergeRetrievalResults = (resultArrays) => {
  const combined = resultArrays.flat()
  const deduped = new Map()
  
  combined.forEach(result => {
    const key = result.id || result.text
    if (!deduped.has(key) || result.score > deduped.get(key).score) {
      deduped.set(key, result)
    }
  })
  
  return Array.from(deduped.values()).sort((a, b) => b.score - a.score)
}