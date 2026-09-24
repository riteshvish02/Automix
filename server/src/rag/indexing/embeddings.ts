// server/src/rag/indexing/embeddings.ts — Dense & Sparse Vector Generators

import {
  generateDenseEmbedding,
  generateBatchDenseEmbeddings,
} from "../config/openrouter";
import { SparseVector } from "../types";

export { generateDenseEmbedding, generateBatchDenseEmbeddings };

// Common English stopwords to avoid polluting sparse vector dimensions
const STOP_WORDS = new Set([
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it",
  "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but",
  "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will",
  "my", "one", "all", "would", "there", "their", "what", "so", "up", "out",
  "if", "about", "who", "get", "which", "go", "me", "when", "make", "can",
  "like", "time", "no", "just", "him", "know", "take", "into", "year", "your",
  "some", "could", "them", "see", "other", "than", "then", "now", "look", "only",
  "come", "its", "over", "think", "also", "back", "after", "use", "two", "how",
  "our", "work", "first", "well", "way", "even", "new", "want", "because", "any",
  "these", "give", "day", "most", "us", "is", "are", "was", "were", "been"
]);

function hashWordToIndex(word: string, maxDim: number = 10000): number {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = (hash * 31 + word.charCodeAt(i)) % maxDim;
  }
  return Math.abs(hash);
}

/**
 * Generate BM25 / TF-IDF style sparse vector for exact keyword matching
 */
export function generateSparseVector(
  chunkId: string,
  text: string,
  topK: number = 100
): SparseVector {
  const tokens = text
    .toLowerCase()
    .split(/[^a-z0-9_-]+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t));

  const totalTokens = tokens.length || 1;
  const termCounts = new Map<string, number>();

  for (const token of tokens) {
    termCounts.set(token, (termCounts.get(token) || 0) + 1);
  }

  const dimensionMap = new Map<number, number>();

  for (const [term, count] of termCounts.entries()) {
    const dimIndex = hashWordToIndex(term);
    // BM25 term frequency saturation: tf / (tf + 1.2)
    const tf = count / totalTokens;
    const bm25Tf = (tf * 2.2) / (tf + 1.2);
    // Combine if hash collision happens
    dimensionMap.set(dimIndex, (dimensionMap.get(dimIndex) || 0) + bm25Tf);
  }

  // Sort by highest weights and retain top K
  const sortedItems = Array.from(dimensionMap.entries())
    .map(([index, value]) => ({ index, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topK);

  return {
    chunkId,
    vector: sortedItems,
  };
}

/**
 * Normalizes dense embedding to unit length
 */
export function normalizeVector(vector: number[]): number[] {
  const sumSq = vector.reduce((sum, val) => sum + val * val, 0);
  const norm = Math.sqrt(sumSq);
  if (norm === 0) return vector;
  return vector.map((v) => v / norm);
}
