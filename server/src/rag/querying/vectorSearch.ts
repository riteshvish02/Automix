// server/src/rag/querying/vectorSearch.ts — Hybrid Dense + Sparse Vector Search

import { generateDenseEmbedding, normalizeVector, generateSparseVector } from "../indexing/embeddings";
import { searchDenseVectors, searchSparseVectors, SPARSE_VECTOR_SIZE } from "../clients/qdrantClient";
import { ScoredChunk } from "../types";

export interface VectorSearchParams {
  query: string;
  userId: string;
  limit?: number;
  documentId?: string;
  denseWeight?: number; // 0 to 1, default: 0.75
}

/**
 * Reciprocal Rank Fusion (RRF) to merge dense and sparse search rankings
 */
function mergeWithRRF(
  denseChunks: ScoredChunk[],
  sparseChunks: ScoredChunk[],
  k: number = 60,
  topLimit: number = 5
): ScoredChunk[] {
  const scoreMap = new Map<string, { chunk: ScoredChunk; rrfScore: number; sources: Set<string> }>();

  // Add dense ranks
  denseChunks.forEach((chunk, rank) => {
    const rrfScore = 1 / (k + rank + 1);
    scoreMap.set(chunk.chunkId, {
      chunk,
      rrfScore,
      sources: new Set(["dense"]),
    });
  });

  // Add sparse ranks
  sparseChunks.forEach((chunk, rank) => {
    const rrfScore = 1 / (k + rank + 1);
    const existing = scoreMap.get(chunk.chunkId);
    if (existing) {
      existing.rrfScore += rrfScore;
      existing.sources.add("sparse");
    } else {
      scoreMap.set(chunk.chunkId, {
        chunk,
        rrfScore,
        sources: new Set(["sparse"]),
      });
    }
  });

  const merged = Array.from(scoreMap.values())
    .sort((a, b) => b.rrfScore - a.rrfScore)
    .slice(0, topLimit)
    .map(({ chunk, rrfScore, sources }) => ({
      ...chunk,
      score: Number(rrfScore.toFixed(4)),
      source: (sources.size > 1 ? "hybrid" : Array.from(sources)[0]) as ScoredChunk["source"],
    }));

  return merged;
}

/**
 * Execute Hybrid Vector Search (Dense Semantic + Sparse BM25 Keyword)
 */
export async function searchHybridVectors({
  query,
  userId,
  limit = 5,
  documentId,
}: VectorSearchParams): Promise<ScoredChunk[]> {
  try {
    // 1. Generate query embeddings in parallel
    const [rawDense, querySparse] = await Promise.all([
      generateDenseEmbedding(query).then((vec) => normalizeVector(vec)),
      Promise.resolve(generateSparseVector("query", query, 50)),
    ]);

    // Build dense representation of sparse query
    const denseFromSparse = new Array(SPARSE_VECTOR_SIZE).fill(0);
    for (const item of querySparse.vector) {
      if (item.index >= 0 && item.index < SPARSE_VECTOR_SIZE) {
        denseFromSparse[item.index] = item.value;
      }
    }

    // 2. Query Qdrant for dense and sparse results
    const [denseResults, sparseResults] = await Promise.allSettled([
      searchDenseVectors(rawDense, userId, limit * 2, documentId),
      searchSparseVectors(denseFromSparse, userId, limit * 2, documentId),
    ]);

    const denseHits = denseResults.status === "fulfilled" ? denseResults.value : [];
    const sparseHits = sparseResults.status === "fulfilled" ? sparseResults.value : [];

    if (denseHits.length === 0 && sparseHits.length === 0) {
      return [];
    }

    // 3. Reciprocal Rank Fusion
    return mergeWithRRF(denseHits, sparseHits, 60, limit);
  } catch (error: any) {
    console.error("[VectorSearch] Error:", error?.message || error);
    return [];
  }
}
