// server/src/rag/querying/ragQuery.ts — Topics 6 & 7: Grounded Answering, Hallucination Reduction & Source Citations

import { retrieveHybridContext } from "./hybridRetriever";
import { completeRAGAnswer, OPENROUTER_CONFIG } from "../config/openrouter";
import { ChatMessageContext, RAGQueryResult, RAGSourceCitation } from "../types";

export interface ExecuteRAGQueryParams {
  query: string;
  userId: string;
  chatHistory?: ChatMessageContext[];
  documentId?: string;
  maxChunks?: number;
  enableCompression?: boolean;
}

const RAG_SYSTEM_PROMPT = `
You are a highly capable enterprise document research assistant.
Your answers must be STRICTLY grounded in the provided context and knowledge graph facts.

CRITICAL RULES:
1. ONLY use information explicitly stated in the provided context snippets or knowledge graph facts. Do not assume or extrapolate.
2. If the context does not contain sufficient information to answer the question, state clearly: "I cannot find sufficient information in your uploaded documents to answer this question." Do NOT hallucinate.
3. Every factual statement or key claim MUST be attributed with an inline citation tag: [Source X] (e.g. "The notice period is 30 days [Source 1].").
4. If multiple sources support a claim, cite them together (e.g. [Source 1, Source 2]).
5. Maintain technical precision — preserve exact numbers, clauses, dates, proper nouns, and policy restrictions verbatim.
6. Format your answer with clear markdown headings, bullet points, or bold text for readability.
`;

/**
 * End-to-end Advanced RAG Query Engine:
 * Rewrite -> Multi-Query Search -> Rerank -> Compress -> Strict Grounded Generation -> Structured Citations
 */
export async function executeRAGQuery({
  query,
  userId,
  chatHistory = [],
  documentId,
  maxChunks = 5,
  enableCompression = true,
}: ExecuteRAGQueryParams): Promise<RAGQueryResult> {
  // 1. Execute full retrieval pipeline
  const context = await retrieveHybridContext({
    query,
    userId,
    chatHistory,
    documentId,
    limitChunks: maxChunks,
    enableCompression,
  });

  // Zero-candidates guard
  if (!context.formattedContext || context.chunks.length === 0) {
    return {
      answer: "No relevant information found in your documents for this question.",
      originalQuery: context.originalQuery,
      canonicalQuery: context.canonicalQuery,
      rewrittenQueries: context.rewrittenQueries,
      sources: [],
      graphFacts: [],
      entitiesUsed: [],
      model: OPENROUTER_CONFIG.chatModel,
    };
  }

  // 2. Synthesize with strict anti-hallucination prompt
  const userPrompt = `
Context Information:
============================================================
${context.formattedContext}
============================================================

User Question:
"${context.canonicalQuery}"

Provide a thorough, accurate answer with inline [Source X] citations based strictly on the context above:
`.trim();

  const answer = await completeRAGAnswer(RAG_SYSTEM_PROMPT, userPrompt);

  // 3. Topic 7 — Format detailed citations with relevance scores & snippets
  const sources: RAGSourceCitation[] = context.chunks.map((c, idx) => ({
    sourceNumber: idx + 1,
    chunkId: c.chunkId,
    documentId: c.documentId,
    documentName: c.documentName || `Document ${c.documentId.substring(0, 8)}`,
    pageNum: c.pageNum,
    sectionTitle: c.sectionTitle,
    relevanceScore: c.rerankScore,
    excerpt: c.compressedText.length > 180 ? `${c.compressedText.slice(0, 180)}...` : c.compressedText,
  }));

  const graphFacts = context.graphEntities.flatMap((e) =>
    e.relatedEntities.map((r) => `${e.name} ${r.relationType} ${r.targetName}`)
  );

  const entitiesUsed = context.graphEntities.map((e) => e.name);

  return {
    answer,
    originalQuery: context.originalQuery,
    canonicalQuery: context.canonicalQuery,
    rewrittenQueries: context.rewrittenQueries,
    sources,
    graphFacts,
    entitiesUsed,
    model: OPENROUTER_CONFIG.chatModel,
  };
}
