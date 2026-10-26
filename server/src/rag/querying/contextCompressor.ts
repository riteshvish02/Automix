// server/src/rag/querying/contextCompressor.ts — Topic 5: Context Compression

import { completeJson } from "../config/openrouter";
import { CompressedChunk, RerankedChunk } from "../types";

const COMPRESS_SYSTEM_PROMPT = `
You are a context compression engine.
Given a query and a set of numbered document passages, extract only the key relevant sentences/facts from each passage that help answer the query.
Remove boilerplate, repetitive phrasing, headers, and irrelevant background information.
Preserve exact numbers, dates, names, clause references, and constraints verbatim.

Return strictly JSON:
{
  "compressed": [
    { "index": 1, "extractedText": "..." }
  ]
}
`;

/**
 * Compresses reranked chunks to maximize information density and reduce token bloat
 */
export async function compressContextChunks(
  query: string,
  chunks: RerankedChunk[]
): Promise<CompressedChunk[]> {
  if (chunks.length === 0) return [];

  // If chunks are already concise (< 120 words), skip extra LLM call
  const allConcise = chunks.every((c) => c.text.split(/\s+/).length < 120);
  if (allConcise) {
    return chunks.map((c) => ({
      ...c,
      compressedText: c.text,
    }));
  }

  const passages = chunks.map(
    (c, i) => `[Passage ${i + 1}]:\n${c.text.substring(0, 1000)}`
  );

  const userPrompt = `
User Query: "${query}"

Passages to compress:
---------------------
${passages.join("\n\n")}
---------------------

Extract only the essential, relevant statements for each passage:
`.trim();

  try {
    const result = await completeJson<{
      compressed?: Array<{ index: number; extractedText: string }>;
    }>(COMPRESS_SYSTEM_PROMPT, userPrompt);

    const map = new Map<number, string>();
    if (Array.isArray(result.compressed)) {
      for (const item of result.compressed) {
        if (item.extractedText && item.extractedText.trim().length > 10) {
          map.set(item.index, item.extractedText.trim());
        }
      }
    }

    return chunks.map((chunk, idx) => ({
      ...chunk,
      compressedText: map.get(idx + 1) || chunk.text,
    }));
  } catch (err: any) {
    console.warn(`[ContextCompressor] Compression fallback: ${err?.message || err}`);
    return chunks.map((c) => ({
      ...c,
      compressedText: c.text,
    }));
  }
}
