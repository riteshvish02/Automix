// lib/indexing/index.ts — Main indexing orchestrator

import * as fs from 'fs'
import { extractPDFContent, cleanText } from './pdf'
import { createSemanticChunks, recursiveSplitChunk } from './chunking'
import {
  generateBatchDenseEmbeddings,
  generateSparseVector,
  normalizeEmbedding
} from './embeddings'
import {
  extractEntitiesFromChunks,
  mergeEntitiesAcrossChunks,
  linkRelationsToEntities
} from './entityExtractor'

import {
  initializeQdrantCollections,
  storeDenseVectors,
  storeSparseVectors,
  deleteDocumentVectors
} from './qdrant'

import {
  initializeNeo4j,
  setupNeo4jSchema,
  createDocumentNode,
  storeEntities,
  storeRelations,
  storeChunks,
  deleteDocumentData
} from './neo4j'

import { Chunk, IndexingResult, IndexMetadata } from './types'
import { v4 as uuid } from 'uuid'

// In-memory progress tracking (replace with DB in production)
const progressMap = new Map<string, number>()

/**
 * Main indexing pipeline
 * Orchestrates all steps: extraction → chunking → embedding → graph extraction → storage
 */
export async function indexPDFDocument(
  pdfFilePath: string,
  userId: string,
  documentTitle: string,
  onProgress?: (stage: string, progress: number) => void
): Promise<IndexingResult> {
  const documentId = `doc_${uuid()}`
  const startTime = Date.now()

  try {
    // Initialize databases
    await initializeQdrantCollections()
    const neo4jDriver = initializeNeo4j()
    await setupNeo4jSchema()

    // ============================================================
    // STAGE 1: Extract PDF content
    // ============================================================
    console.log(`[1/6] Extracting PDF content...`)
    onProgress?.('extracting', 10)

    const pdfContent = await extractPDFContent(pdfFilePath)
    const cleanedText = cleanText(pdfContent.fullText)

    // ============================================================
    // STAGE 2: Create semantic chunks
    // ============================================================
    console.log(`[2/6] Creating semantic chunks...`)
    onProgress?.('chunking', 20)

    let chunks = createSemanticChunks(cleanedText, pdfContent.pages, {
      targetChunkSize: 300,
      overlapSize: 50,
      sentenceBuffer: 2
    })

    // Handle very long chunks
    const expandedChunks: Chunk[] = []
    for (const chunk of chunks) {
      const split = recursiveSplitChunk(chunk, 300)
      expandedChunks.push(...split)
    }
    chunks = expandedChunks

    console.log(`  → Created ${chunks.length} chunks`)

    // Store chunks in map for quick lookup
    const chunkMap = new Map(chunks.map(c => [c.id, c]))

    // ============================================================
    // STAGE 3: Generate dense embeddings
    // ============================================================
    console.log(`[3/6] Generating dense embeddings...`)
    onProgress?.('embedding', 35)

    const chunkTexts = chunks.map(c => c.text)
    const denseEmbeddings = await generateBatchDenseEmbeddings(
      chunkTexts,
      5 // batch size
    )

    // Normalize embeddings
    const normalizedEmbeddings = denseEmbeddings.map(emb =>
      normalizeEmbedding(emb)
    )

    // Map to chunks
    const denseVectors = chunks.map((chunk, idx) => ({
      chunkId: chunk.id,
      vector: normalizedEmbeddings[idx]
    }))

    console.log(`  → Generated ${denseVectors.length} dense embeddings`)

    // ============================================================
    // STAGE 4: Generate sparse vectors (BM25)
    // ============================================================
    console.log(`[4/6] Generating sparse vectors...`)
    onProgress?.('embedding', 50)

    const sparseVectorMap = new Map()
    for (const chunk of chunks) {
      const sparseVec = await generateSparseVector(chunk.text, 100)
      sparseVectorMap.set(chunk.id, sparseVec)
    }

    console.log(`  → Generated ${chunks.length} sparse vectors`)

    // ============================================================
    // STAGE 5: Extract entities and relationships
    // ============================================================
    console.log(`[5/6] Extracting entities and relationships...`)
    onProgress?.('graph_extraction', 65)

    const entityMap = await extractEntitiesFromChunks(
      chunks.map(c => ({ id: c.id, text: c.text })),
      5, // batch size
      500 // delay between batches (ms)
    )

    // Merge entities across chunks
    const uniqueEntities = mergeEntitiesAcrossChunks(entityMap)
    console.log(`  → Found ${uniqueEntities.size} unique entities`)

    // Collect all relations from entity extractions
    const allRelations: any[] = []
    for (const [, { relations }] of entityMap.entries()) {
      allRelations.push(...relations)
    }

    // Link relations to merged entities
    const linkedRelations = linkRelationsToEntities(
      allRelations,
      uniqueEntities
    )
    console.log(`  → Found ${linkedRelations.length} relationships`)

    // ============================================================
    // STAGE 6: Store in databases
    // ============================================================
    console.log(`[6/6] Storing in databases...`)
    onProgress?.('indexing_qdrant', 75)

    // Create document node in Neo4j
    await createDocumentNode(documentId, userId, documentTitle)

    // Store chunks in Neo4j
    await storeChunks(documentId, chunks)

    // Store entities in Neo4j
    const entityIds = await storeEntities(
      documentId,
      Array.from(uniqueEntities.values())
    )

    // Store relations in Neo4j
    const relationIds = await storeRelations(documentId, linkedRelations)

    onProgress?.('indexing_qdrant', 85)

    // Store dense vectors in Qdrant
    const qdrantDenseIds = await storeDenseVectors(
      denseVectors,
      userId,
      documentId,
      chunkMap
    )

    // Store sparse vectors in Qdrant
    const qdrantSparseIds = await storeSparseVectors(
      chunks,
      userId,
      documentId,
      sparseVectorMap
    )

    onProgress?.('completed', 100)

    // ============================================================
    // Return results
    // ============================================================
    const completedAt = Date.now()
    const result: IndexingResult = {
      documentId,
      success: true,
      chunksCreated: chunks.length,
      entitiesCreated: entityIds.length,
      relationsCreated: relationIds.length,
      denseVectorsStored: qdrantDenseIds.length,
      sparseVectorsStored: qdrantSparseIds.length,
      qdrantIds: [...qdrantDenseIds, ...qdrantSparseIds],
      neo4jEntityIds: entityIds,
      neo4jRelationIds: relationIds,
      completedAt
    }

    console.log(`
✅ INDEXING COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Document ID: ${documentId}
Duration: ${((completedAt - startTime) / 1000).toFixed(2)}s
Chunks: ${result.chunksCreated}
Entities: ${result.entitiesCreated}
Relations: ${result.relationsCreated}
Dense vectors: ${result.denseVectorsStored}
Sparse vectors: ${result.sparseVectorsStored}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `)

    // Save metadata
    await saveIndexMetadata(documentId, userId, result)

    return result
  } catch (error) {
    console.error(`❌ Indexing failed: ${error.message}`)
    throw error
  }
}

/**
 * Re-index a document (delete old data and create new)
 */
export async function reindexDocument(
  pdfFilePath: string,
  userId: string,
  documentId: string,
  documentTitle: string,
  onProgress?: (stage: string, progress: number) => void
): Promise<IndexingResult> {
  console.log(`Re-indexing document ${documentId}...`)

  // Delete old data
  await deleteDocumentVectors(documentId, userId)
  await deleteDocumentData(documentId, userId)

  // Re-index from scratch
  return indexPDFDocument(pdfFilePath, userId, documentTitle, onProgress)
}

/**
 * Save indexing metadata (for later cleanup)
 */
async function saveIndexMetadata(
  documentId: string,
  userId: string,
  result: IndexingResult
): Promise<void> {
  const metadata: IndexMetadata = {
    documentId,
    userId,
    fileName: '', // would come from upload handler
    uploadedAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    totalChunks: result.chunksCreated,
    qdrantIds: result.qdrantIds,
    neo4jEntityIds: result.neo4jEntityIds,
    neo4jRelationIds: result.neo4jRelationIds,
    indexingStatus: 'completed'
  }

  // Save to file (in production, use database)
  const metadataPath = `/tmp/indexing_metadata_${documentId}.json`
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))

  console.log(`✓ Metadata saved to ${metadataPath}`)
}

/**
 * Cleanup expired documents (background job)
 * Call periodically (e.g., every hour)
 */
export async function cleanupExpiredDocuments(): Promise<number> {
  console.log('Running cleanup job...')

  let cleanedCount = 0

  // In production, query metadata DB for expired documents
  // For now, just log

  console.log(`✓ Cleaned up ${cleanedCount} expired documents`)
  return cleanedCount
}