// server/src/rag/clients/qdrantClient.ts — Qdrant Vector DB Client & Operations

import { Chunk, DenseVector, ScoredChunk, SparseVector } from "../types";

const QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY || undefined;

export const DENSE_COLLECTION = "documents-dense";
export const SPARSE_COLLECTION = "documents-sparse";
export const DENSE_VECTOR_SIZE = 1536; // OpenAI / OpenRouter text-embedding-3-small dimension
export const SPARSE_VECTOR_SIZE = 10000;

let clientInstance: any = null;

/**
 * Get or initialize QdrantClient dynamically (compatible with CommonJS runtime)
 */
export async function getQdrantClient() {
  if (clientInstance) return clientInstance;

  const { QdrantClient } = await import("@qdrant/js-client-rest");
  clientInstance = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY,
  });
  return clientInstance;
}

/**
 * Generate a deterministic numeric ID from document, chunk, and type
 */
export function generatePointId(documentId: string, chunkId: string, type: "dense" | "sparse"): number {
  const combined = `${documentId}:${chunkId}:${type}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Initialize Qdrant collections if they don't already exist
 */
export async function initializeQdrantCollections(): Promise<void> {
  try {
    const client = await getQdrantClient();
    const collectionsResponse = await client.getCollections();
    const existing = (collectionsResponse.collections || []).map((c: any) => c.name);

    if (!existing.includes(DENSE_COLLECTION)) {
      console.log(`[Qdrant] Creating collection: ${DENSE_COLLECTION}`);
      await client.createCollection(DENSE_COLLECTION, {
        vectors: {
          size: DENSE_VECTOR_SIZE,
          distance: "Cosine",
        },
      });
    }

    if (!existing.includes(SPARSE_COLLECTION)) {
      console.log(`[Qdrant] Creating collection: ${SPARSE_COLLECTION}`);
      await client.createCollection(SPARSE_COLLECTION, {
        vectors: {
          size: SPARSE_VECTOR_SIZE,
          distance: "Cosine",
        },
      });
    }

    console.log("✓ Qdrant collections initialized");
  } catch (error: any) {
    console.warn(`[Qdrant] Warning initializing collections: ${error?.message || error}`);
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
  const client = await getQdrantClient();
  const points = vectors.map((vec) => {
    const chunk = chunks.get(vec.chunkId);
    if (!chunk) throw new Error(`Chunk ${vec.chunkId} not found in chunkMap`);

    return {
      id: generatePointId(documentId, vec.chunkId, "dense"),
      vector: vec.vector,
      payload: {
        userId,
        documentId,
        chunkId: vec.chunkId,
        text: chunk.text,
        pageNum: chunk.pageNum,
        sectionTitle: chunk.sectionTitle || "",
        vectorType: "dense",
        indexedAt: Date.now(),
      },
    };
  });

  await client.upsert(DENSE_COLLECTION, {
    wait: true,
    points,
  });

  return points.map((p) => String(p.id));
}

/**
 * Store sparse vectors in Qdrant
 */
export async function storeSparseVectors(
  chunks: Chunk[],
  userId: string,
  documentId: string,
  sparseVectorMap: Map<string, SparseVector>
): Promise<string[]> {
  const client = await getQdrantClient();
  const points = chunks.map((chunk) => {
    const sparseVec = sparseVectorMap.get(chunk.id);
    const denseFromSparse = new Array(SPARSE_VECTOR_SIZE).fill(0);

    if (sparseVec && Array.isArray(sparseVec.vector)) {
      for (const item of sparseVec.vector) {
        if (item.index >= 0 && item.index < SPARSE_VECTOR_SIZE) {
          denseFromSparse[item.index] = item.value;
        }
      }
    }

    return {
      id: generatePointId(documentId, chunk.id, "sparse"),
      vector: denseFromSparse,
      payload: {
        userId,
        documentId,
        chunkId: chunk.id,
        text: chunk.text,
        pageNum: chunk.pageNum,
        sectionTitle: chunk.sectionTitle || "",
        vectorType: "sparse",
        indexedAt: Date.now(),
      },
    };
  });

  await client.upsert(SPARSE_COLLECTION, {
    wait: true,
    points,
  });

  return points.map((p) => String(p.id));
}

/**
 * Search dense vectors by query embedding using client.query
 */
export async function searchDenseVectors(
  queryVector: number[],
  userId: string,
  limit: number = 5,
  documentId?: string
): Promise<ScoredChunk[]> {
  const client = await getQdrantClient();
  const filter: any = {
    must: [{ key: "userId", match: { value: userId } }],
  };

  if (documentId) {
    filter.must.push({ key: "documentId", match: { value: documentId } });
  }

  const response = await client.query(DENSE_COLLECTION, {
    query: queryVector,
    limit,
    filter,
    with_payload: true,
  });

  const points = response.points || [];
  return points.map((r: any) => ({
    chunkId: r.payload?.chunkId || "",
    documentId: r.payload?.documentId || "",
    text: r.payload?.text || "",
    pageNum: r.payload?.pageNum || 1,
    sectionTitle: r.payload?.sectionTitle || undefined,
    score: r.score || 0,
    source: "dense",
  }));
}

/**
 * Search sparse vectors by query sparse vector using client.query
 */
export async function searchSparseVectors(
  sparseVectorArray: number[],
  userId: string,
  limit: number = 5,
  documentId?: string
): Promise<ScoredChunk[]> {
  const client = await getQdrantClient();
  const filter: any = {
    must: [{ key: "userId", match: { value: userId } }],
  };

  if (documentId) {
    filter.must.push({ key: "documentId", match: { value: documentId } });
  }

  const response = await client.query(SPARSE_COLLECTION, {
    query: sparseVectorArray,
    limit,
    filter,
    with_payload: true,
  });

  const points = response.points || [];
  return points.map((r: any) => ({
    chunkId: r.payload?.chunkId || "",
    documentId: r.payload?.documentId || "",
    text: r.payload?.text || "",
    pageNum: r.payload?.pageNum || 1,
    sectionTitle: r.payload?.sectionTitle || undefined,
    score: r.score || 0,
    source: "sparse",
  }));
}

/**
 * Delete all vectors associated with a document
 */
export async function deleteDocumentVectors(documentId: string, userId: string): Promise<void> {
  const client = await getQdrantClient();
  const filter = {
    must: [
      { key: "documentId", match: { value: documentId } },
      { key: "userId", match: { value: userId } },
    ],
  };

  await Promise.allSettled([
    client.delete(DENSE_COLLECTION, { filter }),
    client.delete(SPARSE_COLLECTION, { filter }),
  ]);
}
