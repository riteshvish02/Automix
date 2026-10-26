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

  const url = (process.env.QDRANT_URL || "http://127.0.0.1:6333").replace("localhost", "127.0.0.1");
  const apiKey = process.env.QDRANT_API_KEY || undefined;

  const { QdrantClient } = await import("@qdrant/js-client-rest");
  clientInstance = new QdrantClient({
    url,
    apiKey,
    checkCompatibility: false,
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
 * Initialize Qdrant collections and payload indexes if they don't already exist
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

    // Ensure required filtering payload indexes exist on both collections (required by Qdrant Cloud)
    const collectionsToEnsure = [DENSE_COLLECTION, SPARSE_COLLECTION];
    const fieldsToEnsure = ["userId", "documentId", "documentTitle"];

    for (const col of collectionsToEnsure) {
      for (const field of fieldsToEnsure) {
        await client
          .createPayloadIndex(col, {
            field_name: field,
            field_schema: "keyword",
          })
          .catch(() => {});
      }
    }

    console.log("✓ Qdrant collections & payload indexes initialized");
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
 * Build flexible Qdrant filter supporting single documentId, documentTitle, or array of documentIds/titles
 */
export function buildDocFilter(
  userId: string,
  documentId?: string,
  documentIds?: string[]
): { filter: any; hasDocFilter: boolean } {
  const filter: any = {
    must: [{ key: "userId", match: { value: userId } }],
  };

  const targets: string[] = [];
  if (Array.isArray(documentIds)) {
    for (const d of documentIds) {
      if (typeof d === "string" && d.trim()) targets.push(d.trim());
    }
  }
  if (documentId && typeof documentId === "string" && documentId.trim()) {
    if (!targets.includes(documentId.trim())) targets.push(documentId.trim());
  }

  if (targets.length === 1) {
    const t = targets[0];
    if (t.startsWith("doc_")) {
      filter.must.push({ key: "documentId", match: { value: t } });
    } else {
      filter.should = [
        { key: "documentId", match: { value: t } },
        { key: "documentTitle", match: { value: t } },
      ];
    }
  } else if (targets.length > 1) {
    const shouldClauses: any[] = [];
    for (const t of targets) {
      shouldClauses.push({ key: "documentId", match: { value: t } });
      shouldClauses.push({ key: "documentTitle", match: { value: t } });
    }
    filter.should = shouldClauses;
  }

  return { filter, hasDocFilter: targets.length > 0 };
}

/**
 * Search dense vectors by query embedding using client.query
 */
export async function searchDenseVectors(
  queryVector: number[],
  userId: string,
  limit: number = 5,
  documentId?: string,
  documentIds?: string[]
): Promise<ScoredChunk[]> {
  const client = await getQdrantClient();
  const { filter, hasDocFilter } = buildDocFilter(userId, documentId, documentIds);

  let response = await client.query(DENSE_COLLECTION, {
    query: queryVector,
    limit,
    filter,
    with_payload: true,
  });

  // Fallback: If filtered by documentId and 0 points found, retry across all user docs
  if (hasDocFilter && (!response.points || response.points.length === 0)) {
    response = await client.query(DENSE_COLLECTION, {
      query: queryVector,
      limit,
      filter: { must: [{ key: "userId", match: { value: userId } }] },
      with_payload: true,
    });
  }

  const points = response.points || [];
  return points.map((r: any) => ({
    chunkId: r.payload?.chunkId || String(r.id),
    documentId: r.payload?.documentId || "",
    documentName: r.payload?.documentTitle,
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
  documentId?: string,
  documentIds?: string[]
): Promise<ScoredChunk[]> {
  const client = await getQdrantClient();
  const { filter, hasDocFilter } = buildDocFilter(userId, documentId, documentIds);

  let response = await client.query(SPARSE_COLLECTION, {
    query: sparseVectorArray,
    limit,
    filter,
    with_payload: true,
  });

  if (hasDocFilter && (!response.points || response.points.length === 0)) {
    response = await client.query(SPARSE_COLLECTION, {
      query: sparseVectorArray,
      limit,
      filter: { must: [{ key: "userId", match: { value: userId } }] },
      with_payload: true,
    });
  }

  const points = response.points || [];
  return points.map((r: any) => ({
    chunkId: r.payload?.chunkId || String(r.id),
    documentId: r.payload?.documentId || "",
    documentName: r.payload?.documentTitle,
    text: r.payload?.text || "",
    pageNum: r.payload?.pageNum || 1,
    sectionTitle: r.payload?.sectionTitle || undefined,
    score: r.score || 0,
    source: "sparse",
  }));
}

/**
 * Retrieve document chunks directly by filter (for summarization, overview, or fallback)
 */
export async function getDocumentChunks(
  userId: string,
  documentId?: string,
  limit: number = 8,
  documentIds?: string[]
): Promise<ScoredChunk[]> {
  try {
    const client = await getQdrantClient();
    const { filter, hasDocFilter } = buildDocFilter(userId, documentId, documentIds);

    let response = await client.scroll(DENSE_COLLECTION, {
      filter,
      limit,
      with_payload: true,
    });

    if (hasDocFilter && (!response.points || response.points.length === 0)) {
      response = await client.scroll(DENSE_COLLECTION, {
        filter: { must: [{ key: "userId", match: { value: userId } }] },
        limit,
        with_payload: true,
      });
    }

    const points = response.points || [];
    return points.map((r: any) => ({
      chunkId: r.payload?.chunkId || String(r.id),
      documentId: r.payload?.documentId || "",
      documentName: r.payload?.documentTitle,
      text: r.payload?.text || "",
      pageNum: r.payload?.pageNum || 1,
      sectionTitle: r.payload?.sectionTitle || undefined,
      score: 0.85,
      source: "dense",
    }));
  } catch (err: any) {
    console.warn(`[Qdrant] getDocumentChunks error: ${err.message || err}`);
    return [];
  }
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
