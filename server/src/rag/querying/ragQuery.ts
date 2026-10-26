// server/src/rag/querying/ragQuery.ts — Topics 6 & 7: Grounded Answering, Hallucination Reduction & Source Citations

import { retrieveHybridContext } from "./hybridRetriever";
import { completeRAGAnswer, OPENROUTER_CONFIG } from "../config/openrouter";
import { ChatMessageContext, RAGQueryResult, RAGSourceCitation } from "../types";

export interface ExecuteRAGQueryParams {
  query: string;
  userId: string;
  chatHistory?: ChatMessageContext[];
  documentId?: string;
  documentIds?: string[];
  maxChunks?: number;
  enableCompression?: boolean;
}

const RAG_SYSTEM_PROMPT = `
You are a highly capable enterprise document research assistant.
Your answers must be grounded in the provided context and knowledge graph facts.

CRITICAL RULES:
1. ONLY use information explicitly stated in the provided context snippets or knowledge graph facts. Do not assume or fabricate details.
2. If the user asks for a summary, overview, or what the document is about: provide a comprehensive, well-structured summary of the document based on all facts, sections, skills, work, or findings in the provided context.
3. If the context does not contain relevant information to answer a specific factual question, state clearly: "I cannot find sufficient information in your uploaded documents to answer this question." Do NOT hallucinate.
4. Every factual statement or key claim should be attributed with an inline citation tag where applicable: [Source X] (e.g. "The notice period is 30 days [Source 1].").
5. If multiple sources support a claim, cite them together (e.g. [Source 1, Source 2]).
6. Maintain technical precision — preserve exact numbers, clauses, dates, proper nouns, and technical details verbatim.
7. Format your answer with clear markdown headings, bullet points, or bold text for readability.
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
  documentIds,
  maxChunks = 5,
  enableCompression = true,
}: ExecuteRAGQueryParams): Promise<RAGQueryResult> {
  // 1. Execute full retrieval pipeline
  const context = await retrieveHybridContext({
    query,
    userId,
    chatHistory,
    documentId,
    documentIds,
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

  // 2. Synthesize with grounded anti-hallucination prompt
  const isSummaryReq =
    context.originalQuery.toLowerCase().includes("summar") ||
    context.canonicalQuery.toLowerCase().includes("summar") ||
    context.originalQuery.toLowerCase().includes("overview");

  const userPrompt = `
Context Information:
============================================================
${context.formattedContext}
============================================================

User Request / Question:
"${isSummaryReq ? "Please summarize the attached document and outline its main contents, sections, and key details." : context.canonicalQuery}"

${
  isSummaryReq
    ? "Provide a structured, rich, and comprehensive summary of the document based on the context above. Group by key sections (e.g., Overview, Background, Skills/Technologies, Projects/Experience, or Key Findings):"
    : "Provide a thorough, accurate answer with inline [Source X] citations based strictly on the context above:"
}
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
