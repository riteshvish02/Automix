// server/src/rag/querying/reranker.ts — Topic 4: Cross-Encoder Candidate Reranker

import { completeJson } from "../config/openrouter";
import { RerankedChunk, ScoredChunk } from "../types";

const RERANK_SYSTEM_PROMPT = `
You are a high-precision relevance reranker for an enterprise document search engine.
Given a user query and a list of numbered text passages, evaluate each passage for its relevance to answering the query.

Assign a score between 0.00 (completely irrelevant) and 1.00 (directly answers the query).
- 0.90 - 1.00: Direct, exact answer containing the specific details, numbers, or rules requested.
- 0.60 - 0.89: Highly relevant context or partial answer.
- 0.20 - 0.59: Tangentially related or background topic mention.
- 0.00 - 0.19: Irrelevant noise or keyword collision without relevant meaning.

Return strictly JSON:
{
  "scores": [
    { "index": 1, "score": 0.95, "reason": "Directly explains the clause" },
    { "index": 2, "score": 0.12, "reason": "Only mentions the word notice in another context" }
  ]
}
`;

/**
 * Deduplicate chunks across multi-query search results by chunkId
 */
export function deduplicateChunks(chunks: ScoredChunk[]): ScoredChunk[] {
  const seen = new Map<string, ScoredChunk>();

  for (const chunk of chunks) {
    const existing = seen.get(chunk.chunkId);
    if (!existing || chunk.score > existing.score) {
      seen.set(chunk.chunkId, chunk);
    }
  }

  return Array.from(seen.values());
}

/**
 * Reranks candidate chunks using an LLM / cross-encoder relevance judge
 */
export async function rerankCandidates(
  query: string,
  candidates: ScoredChunk[],
  topK: number = 5,
  minThreshold: number = 0.20
): Promise<RerankedChunk[]> {
  if (candidates.length === 0) return [];

  // If candidate count is small, simple score sort
  if (candidates.length <= 1) {
    return candidates.map((c) => ({
      ...c,
      rerankScore: c.score,
    }));
  }

  // Format passages for batch scoring
  const passageSnippets = candidates.map(
    (c, i) =>
      `[Passage ${i + 1} | ID: ${c.chunkId}]:\n${c.text.substring(0, 400)}`
  );

  const userPrompt = `
Search Query: "${query}"

Passages to evaluate:
---------------------
${passageSnippets.join("\n\n")}
---------------------

Score all ${candidates.length} passages strictly on relevance to the query:
`.trim();

  let rerankedList: RerankedChunk[] = [];

  try {
    const result = await completeJson<{
      scores?: Array<{ index: number; score: number; reason?: string }>;
    }>(RERANK_SYSTEM_PROMPT, userPrompt);

    const scoreMap = new Map<number, { score: number; reason?: string }>();
    if (Array.isArray(result.scores)) {
      for (const item of result.scores) {
        scoreMap.set(item.index, {
          score: Math.min(1, Math.max(0, Number(item.score) || 0)),
          reason: item.reason,
        });
      }
    }

    rerankedList = candidates.map((chunk, idx) => {
      const scored = scoreMap.get(idx + 1);
      const rerankScore = scored?.score !== undefined ? scored.score : chunk.score;
      return {
        ...chunk,
        rerankScore: Number(rerankScore.toFixed(3)),
        relevanceReasoning: scored?.reason,
      };
    });
  } catch (err: any) {
    console.warn(`[Reranker] Scoring fallback: ${err?.message || err}`);
    // Fallback: use initial vector RRF score normalized
    rerankedList = candidates.map((c) => ({
      ...c,
      rerankScore: Number(Math.min(1, c.score * 10).toFixed(3)),
    }));
  }

  // Sort descending by rerank score
  rerankedList.sort((a, b) => b.rerankScore - a.rerankScore);

  // Filter by minimum threshold (keep at least top 1 even if low)
  const filtered = rerankedList.filter((c, idx) => c.rerankScore >= minThreshold || idx === 0);
  const topResults = filtered.slice(0, topK);

  // Production-grade debug logging as requested
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`[Reranker] Query: "${query}"`);
  console.log(`[Reranker] ${candidates.length} unique candidates evaluated`);
  console.log(`[Reranker] Top ${topResults.length} reranked chunks:`);
  topResults.forEach((c, i) => {
    const excerpt = c.text.replace(/\s+/g, " ").slice(0, 100);
    console.log(`  ${i + 1}. Score: ${c.rerankScore.toFixed(3)} — "${excerpt}..."`);
  });
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  return topResults;
}
