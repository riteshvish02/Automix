// lib/indexing/neo4j.ts — Neo4j graph DB operations

import neo4j, { Driver, Session } from 'neo4j-driver'
import { Entity, Relation, Chunk } from '@/types/indexing'

// Initialize Neo4j driver
let driver: Driver | null = null

export function initializeNeo4j(): Driver {
  if (driver) return driver

  const uri = process.env.NEO4J_URI || 'bolt://localhost:7687'
  const user = process.env.NEO4J_USER || 'neo4j'
  const password = process.env.NEO4J_PASSWORD || 'password'

  driver = neo4j.driver(uri, neo4j.auth.basic(user, password))

  return driver
}

export function getNeo4jDriver(): Driver {
  if (!driver) {
    throw new Error('Neo4j driver not initialized. Call initializeNeo4j() first')
  }
  return driver
}

/**
 * Setup Neo4j schema and indexes
 * Call once on application startup
 */
export async function setupNeo4jSchema(): Promise<void> {
  const driver = getNeo4jDriver()
  const session = driver.session()

  try {
    console.log('Setting up Neo4j schema...')

    // Create constraints and indexes
    await session.run(`
      CREATE CONSTRAINT entity_id IF NOT EXISTS 
      FOR (e:Entity) REQUIRE e.id IS UNIQUE
    `)

    await session.run(`
      CREATE CONSTRAINT document_id IF NOT EXISTS 
      FOR (d:Document) REQUIRE d.id IS UNIQUE
    `)

    await session.run(`
      CREATE INDEX entity_name IF NOT EXISTS 
      FOR (e:Entity) ON (e.name)
    `)

    await session.run(`
      CREATE INDEX document_id_idx IF NOT EXISTS 
      FOR (d:Document) ON (d.id)
    `)

    console.log('✓ Neo4j schema ready')
  } catch (error) {
    throw new Error(`Failed to setup Neo4j schema: ${error.message}`)
  } finally {
    await session.close()
  }
}

/**
 * Create or update Document node
 */
export async function createDocumentNode(
  documentId: string,
  userId: string,
  fileName: string
): Promise<void> {
  const driver = getNeo4jDriver()
  const session = driver.session()

  try {
    await session.run(
      `
      MERGE (d:Document {id: $documentId})
      SET d.userId = $userId,
          d.fileName = $fileName,
          d.indexedAt = timestamp()
      `,
      { documentId, userId, fileName }
    )

    console.log(`✓ Created document node: ${documentId}`)
  } catch (error) {
    throw new Error(`Failed to create document node: ${error.message}`)
  } finally {
    await session.close()
  }
}

/**
 * Store entities (bulk)
 */
export async function storeEntities(
  documentId: string,
  entities: Entity[]
): Promise<string[]> {
  const driver = getNeo4jDriver()
  const session = driver.session()

  try {
    const createdIds: string[] = []

    for (const entity of entities) {
      const result = await session.run(
        `
        MERGE (e:Entity {id: $id})
        SET e.name = $name,
            e.type = $type,
            e.confidence = $confidence,
            e.createdAt = timestamp()
        RETURN e.id as id
        `,
        {
          id: entity.id,
          name: entity.name,
          type: entity.type,
          confidence: entity.confidence
        }
      )

      if (result.records.length > 0) {
        createdIds.push(result.records[0].get('id'))
      }

      // Create APPEARS_IN relationship between document and entity
      await session.run(
        `
        MATCH (d:Document {id: $documentId})
        MATCH (e:Entity {id: $entityId})
        MERGE (d)-[r:APPEARS_IN]->(e)
        SET r.mentionedInChunks = $chunks,
            r.confidence = $confidence
        `,
        {
          documentId,
          entityId: entity.id,
          chunks: entity.mentionedIn,
          confidence: entity.confidence
        }
      )
    }

    console.log(`✓ Stored ${createdIds.length} entities for ${documentId}`)
    return createdIds
  } catch (error) {
    throw new Error(`Failed to store entities: ${error.message}`)
  } finally {
    await session.close()
  }
}

/**
 * Store relationships (bulk)
 */
export async function storeRelations(
  documentId: string,
  relations: Relation[]
): Promise<string[]> {
  const driver = getNeo4jDriver()
  const session = driver.session()

  try {
    const createdIds: string[] = []

    for (const relation of relations) {
      // Create relation between entities
      const result = await session.run(
        `
        MATCH (source:Entity {id: $sourceId})
        MATCH (target:Entity {id: $targetId})
        CREATE (source)-[r:\`${relation.type}\` {
          id: $relationId,
          confidence: $confidence,
          context: $context,
          documentId: $documentId,
          createdAt: timestamp()
        }]->(target)
        RETURN r.id as id
        `,
        {
          sourceId: relation.sourceEntity,
          targetId: relation.targetEntity,
          relationId: relation.id,
          confidence: relation.confidence,
          context: relation.context,
          documentId,
          relationType: relation.type
        }
      )

      if (result.records.length > 0) {
        createdIds.push(relation.id)
      }
    }

    console.log(`✓ Stored ${createdIds.length} relations for ${documentId}`)
    return createdIds
  } catch (error) {
    throw new Error(`Failed to store relations: ${error.message}`)
  } finally {
    await session.close()
  }
}

/**
 * Create chunk nodes (for traceability)
 */
export async function storeChunks(
  documentId: string,
  chunks: Chunk[]
): Promise<void> {
  const driver = getNeo4jDriver()
  const session = driver.session()

  try {
    for (const chunk of chunks) {
      await session.run(
        `
        MERGE (c:Chunk {id: $chunkId})
        SET c.text = $text,
            c.pageNum = $pageNum,
            c.sectionTitle = $sectionTitle
        WITH c
        MATCH (d:Document {id: $documentId})
        MERGE (d)-[r:HAS_CHUNK]->(c)
        SET r.order = $order
        `,
        {
          chunkId: chunk.id,
          text: chunk.text.substring(0, 5000), // Limit for storage
          pageNum: chunk.pageNum,
          sectionTitle: chunk.sectionTitle || '',
          documentId,
          order: chunk.startCharIndex
        }
      )
    }

    console.log(`✓ Stored ${chunks.length} chunks for ${documentId}`)
  } catch (error) {
    throw new Error(`Failed to store chunks: ${error.message}`)
  } finally {
    await session.close()
  }
}

/**
 * Delete all data for a document
 * Cascading delete of entities, relations, chunks
 */
export async function deleteDocumentData(
  documentId: string,
  userId: string
): Promise<number> {
  const driver = getNeo4jDriver()
  const session = driver.session()

  try {
    // Get counts before deletion
    const countResult = await session.run(
      `
      MATCH (d:Document {id: $documentId})
      WITH d
      OPTIONAL MATCH (d)-[r:APPEARS_IN]->(e:Entity)
      OPTIONAL MATCH (d)-[cr:HAS_CHUNK]->(c:Chunk)
      RETURN count(DISTINCT e) as entities, count(DISTINCT c) as chunks
      `,
      { documentId }
    )

    // Delete the document (cascading deletes relationships)
    const deleteResult = await session.run(
      `
      MATCH (d:Document {id: $documentId})
      DETACH DELETE d
      `,
      { documentId }
    )

    const deleted = countResult.records[0]?.values || [0, 0]
    console.log(
      `✓ Deleted document ${documentId} and associated data: entities=${deleted[0]}, chunks=${deleted[1]}`
    )

    return deleted[0] + deleted[1]
  } catch (error) {
    throw new Error(`Failed to delete document data: ${error.message}`)
  } finally {
    await session.close()
  }
}

/**
 * Get database stats
 */
export async function getNeo4jStats(): Promise<{
  entities: number
  relations: number
  documents: number
}> {
  const driver = getNeo4jDriver()
  const session = driver.session()

  try {
    const result = await session.run(`
      RETURN 
        count(DISTINCT e) as entities,
        count(DISTINCT r) as relations,
        count(DISTINCT d) as documents
      FROM 
        MATCH (e:Entity) 
        OPTIONAL MATCH ()-[r]->()
        MATCH (d:Document)
    `)

    if (result.records.length === 0) {
      return { entities: 0, relations: 0, documents: 0 }
    }

    const record = result.records[0]
    return {
      entities: record.get('entities'),
      relations: record.get('relations'),
      documents: record.get('documents')
    }
  } catch (error) {
    throw new Error(`Failed to get stats: ${error.message}`)
  } finally {
    await session.close()
  }
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  const driver = getNeo4jDriver()

  try {
    const session = driver.session()
    await session.run('RETURN 1')
    await session.close()
    return true
  } catch (error) {
    console.error('Neo4j health check failed:', error)
    return false
  }
}

/**
 * Close driver connection (call on app shutdown)
 */
export async function closeNeo4j(): Promise<void> {
  if (driver) {
    await driver.close()
    driver = null
  }
}