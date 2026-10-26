// server/src/rag/querying/queryRewriter.ts — Topic 2: Smart Query Rewriting & Expansion

import { completeJson } from "../config/openrouter";
import { ChatMessageContext, QueryRewriteResult } from "../types";

const REWRITE_SYSTEM_PROMPT = `
You are an expert search query transformation engine for enterprise document search.
Given a user's question and recent conversation history, your job is to:
1. "canonicalQuery": De-reference pronouns (e.g. "it", "they", "that clause", "its cost") and turn the question into a self-contained, standalone search query.
   - CRITICAL: If the user asks to "summarize this pdf", "summarize", "overview of document", "what does this document say?", or mentions an attached file: set canonicalQuery to "Comprehensive document summary, key background, sections, and main details".
2. "rewrittenQueries": Generate 2 to 4 distinct search variations to maximize retrieval recall across Vector (dense) and BM25 Keyword (sparse) indexes:
   - One semantic phrasing (for conceptual vector similarity)
   - One keyword-dense phrasing (exact nouns, clauses, IDs, or technical acronyms)
   - For summarization requests: include variations like "Introduction, scope, and background", "Main findings and conclusions", and any document title mentioned in context.
3. "extractedEntities": Extract all key named entities (people, companies, product names, clause IDs, sections, document filenames).

Return strictly JSON conforming to:
{
  "canonicalQuery": "...",
  "rewrittenQueries": ["...", "..."],
  "extractedEntities": ["..."]
}
`;

/**
 * Transforms user questions with history into high-recall retrieval queries
 */
export async function smartQueryRewrite(
  question: string,
  chatHistory: ChatMessageContext[] = []
): Promise<QueryRewriteResult> {
  const trimmed = question.trim();
  if (!trimmed) {
    return {
      originalQuery: "",
      canonicalQuery: "",
      rewrittenQueries: [],
      extractedEntities: [],
    };
  }

  // Format recent chat history (last 4 turns)
  const recentHistory = chatHistory
    .slice(-4)
    .map((m) => `${m.role.toUpperCase()}: ${m.content.substring(0, 300)}`)
    .join("\n");

  const userPrompt = `
Recent Conversation History:
${recentHistory || "(No previous messages)"}

Current User Question:
${trimmed}
`.trim();

  try {
    const result = await completeJson<{
      canonicalQuery?: string;
      rewrittenQueries?: string[];
      extractedEntities?: string[];
    }>(REWRITE_SYSTEM_PROMPT, userPrompt);

    const canonical = result.canonicalQuery?.trim() || trimmed;
    const queries = Array.isArray(result.rewrittenQueries) && result.rewrittenQueries.length > 0
      ? Array.from(new Set([canonical, ...result.rewrittenQueries.map((q) => q.trim())]))
      : [canonical];

    const entities = Array.isArray(result.extractedEntities)
      ? result.extractedEntities.map((e) => e.trim().toLowerCase()).filter(Boolean)
      : [];

    return {
      originalQuery: trimmed,
      canonicalQuery: canonical,
      rewrittenQueries: queries.slice(0, 4),
      extractedEntities: entities,
    };
  } catch (error: any) {
    console.warn(`[QueryRewriter] Notice (using fallback): ${error?.message || error}`);
    return {
      originalQuery: trimmed,
      canonicalQuery: trimmed,
      rewrittenQueries: [trimmed],
      extractedEntities: [],
    };
  }
}
