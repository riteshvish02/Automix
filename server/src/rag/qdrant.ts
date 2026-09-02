// lib/indexing/qdrant.ts — Qdrant vector DB operations

import { QdrantClient } from '@qdrant/js-client-rest'
import { Chunk } from '@/types/indexing'
import { DenseVector, SparseVector } from '@/types/indexing'

// Initialize Qdrant client
const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL || 'http://localhost:6333',
  apiKey: process.env.QDRANT_API_KEY
})

const DENSE_COLLECTION = 'documents-dense'
const SPARSE_COLLECTION = 'documents-sparse'
const VECTOR_DIM_DENSE = 1536 // Anthropic embedding dimension
const VECTOR_DIM_SPARSE = 10000 // Max vocab size for sparse vectors

/**
 * Initialize Qdrant collections if they don't exist
 */
export async function initializeQdrantCollections(): Promise<void> {
  try {
    // Check if collections exist
    const collections = await qdrant.getCollections()
    const collectionNames = collections.collections.map(c => c.name)

    // Create dense collection if needed
    if (!collectionNames.includes(DENSE_COLLECTION)) {
      console.log(`Creating collection: ${DENSE_COLLECTION}`)
      await qdrant.createCollection(DENSE_COLLECTION, {
        vectors: {
          size: VECTOR_DIM_DENSE,
          distance: 'Cosine' // Cosine similarity for embeddings
        }
      })
    }

    // Create sparse collection if needed
    if (!collectionNames.includes(SPARSE_COLLECTION)) {
      console.log(`Creating collection: ${SPARSE_COLLECTION}`)
      await qdrant.createCollection(SPARSE_COLLECTION, {
        vectors: {
          size: VECTOR_DIM_SPARSE,
          distance: 'Cosine'
        }
      })
    }

    console.log('✓ Qdrant collections ready')
  } catch (error) {
    throw new Error(`Failed to initialize Qdrant collections: ${error.message}`)
  }
}

/**
 * Store dense vectors in Qdrant
 */
export async function storeDenseVectors(
  vectors: DenseVector[],
  userId: string,
  documentId: string,
  chunks: Map<string, Chunk>
): Promise<string[]> {
  const points = vectors.map(vec => {
    const chunk = chunks.get(vec.chunkId)
    if (!chunk) throw new Error(`Chunk ${vec.chunkId} not found`)

    return {
      id: generatePointId(documentId, vec.chunkId, 'dense'),
      vector: vec.vector,
      payload: {
        userId,
        documentId,
        chunkId: vec.chunkId,
        text: chunk.text.substring(0, 5000), // Store chunk text for display
        pageNum: chunk.pageNum,
        sectionTitle: chunk.sectionTitle || '',
        vectorType: 'dense',
        indexedAt: Date.now()
      }
    }
  })

  try {
    await qdrant.upsert(DENSE_COLLECTION, {
      wait: true,
      points
    })

    console.log(`✓ Stored ${points.length} dense vectors`)
    return points.map(p => String(p.id))
  } catch (error) {
    throw new Error(`Failed to store dense vectors: ${error.message}`)
  }
}

/**
 * Store sparse vectors in Qdrant
 * Sparse vectors are stored as dense vectors with high dimensionality
 * Only non-zero dimensions are explicitly set
 */
export async function storeSparseVectors(
  chunks: Chunk[],
  userId: string,
  documentId: string,
  sparseVectorMap: Map<string, any>
): Promise<string[]> {
  const points = chunks.map(chunk => {
    const sparseVec = sparseVectorMap.get(chunk.id)
    if (!sparseVec) {
      throw new Error(`No sparse vector for chunk ${chunk.id}`)
    }

    // Convert sparse format to dense for Qdrant
    // This is a 10000-dim vector, mostly zeros
    const denseFromSparse = new Array(VECTOR_DIM_SPARSE).fill(0)

    if (Array.isArray(sparseVec) && sparseVec.length > 0) {
      for (const item of sparseVec) {
        if (item.index !== undefined && item.value !== undefined) {
          denseFromSparse[item.index] = item.value
        }
      }
    }

    return {
      id: generatePointId(documentId, chunk.id, 'sparse'),
      vector: denseFromSparse,
      payload: {
        userId,
        documentId,
        chunkId: chunk.id,
        text: chunk.text.substring(0, 5000),
        pageNum: chunk.pageNum,
        sectionTitle: chunk.sectionTitle || '',
        vectorType: 'sparse',
        indexedAt: Date.now()
      }
    }
  })

  try {
    await qdrant.upsert(SPARSE_COLLECTION, {
      wait: true,
      points
    })

    console.log(`✓ Stored ${points.length} sparse vectors`)
    return points.map(p => String(p.id))
  } catch (error) {
    throw new Error(`Failed to store sparse vectors: ${error.message}`)
  }
}

/**
 * Delete all vectors for a document
 * Called during cleanup/re-indexing
 */
export async function deleteDocumentVectors(
  documentId: string,
  userId: string
): Promise<number> {
  try {
    // Delete from dense collection
    const resultDense = await qdrant.deleteByFilter(DENSE_COLLECTION, {
      filter: {
        must: [
          {
            key: 'documentId',
            match: {
              value: documentId
            }
          },
          {
            key: 'userId',
            match: {
              value: userId
            }
          }
        ]
      }
    })

    // Delete from sparse collection
    const resultSparse = await qdrant.deleteByFilter(SPARSE_COLLECTION, {
      filter: {
        must: [
          {
            key: 'documentId',
            match: {
              value: documentId
            }
          },
          {
            key: 'userId',
            match: {
              value: userId
            }
          }
        ]
      }
    })

    const totalDeleted = (resultDense.deleted || 0) + (resultSparse.deleted || 0)
    console.log(`✓ Deleted ${totalDeleted} vectors for document ${documentId}`)
    return totalDeleted
  } catch (error) {
    throw new Error(`Failed to delete document vectors: ${error.message}`)
  }
}

/**
 * Get collection stats (for monitoring)
 */
export async function getCollectionStats(): Promise<{
  dense: any
  sparse: any
}> {
  try {
    const denseStats = await qdrant.getCollection(DENSE_COLLECTION)
    const sparseStats = await qdrant.getCollection(SPARSE_COLLECTION)

    return {
      dense: denseStats,
      sparse: sparseStats
    }
  } catch (error) {
    throw new Error(`Failed to get collection stats: ${error.message}`)
  }
}

/**
 * Generate unique point ID combining document, chunk, and type
 */
function generatePointId(
  documentId: string,
  chunkId: string,
  type: 'dense' | 'sparse'
): string {
  // Create deterministic ID to avoid duplicates
  const combined = `${documentId}:${chunkId}:${type}`
  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const result = await qdrant.healthChecks()
    return result.status === 'ok'
  } catch (error) {
    console.error('Qdrant health check failed:', error)
    return false
  }
}