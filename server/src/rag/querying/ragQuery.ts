// server/src/rag/querying/ragQuery.ts — End-to-End RAG Query Answering

import { retrieveHybridContext } from "./hybridRetriever";
import { completeRAGAnswer, OPENROUTER_CONFIG } from "../config/openrouter";
import { RAGQueryResult } from "../types";

export interface ExecuteRAGQueryParams {
  query: string;
  userId: string;
  documentId?: string;
  maxChunks?: number;
}

const RAG_SYSTEM_PROMPT = `
You are an intelligent knowledge assistant answering questions based strictly on the user's uploaded documents and knowledge graph.

Guidelines:
1. Answer the question accurately using ONLY the provided context snippets and knowledge graph facts.
2. If the context does not contain the answer, say clearly: "I cannot find sufficient information in your uploaded documents to answer this question." Do not make up facts.
3. Cite your sources inline where appropriate using [Source X, Page Y].
4. Be concise, structured, and helpful. Use markdown bullet points or bold text where appropriate.
`;

/**
 * Executes a full RAG query: retrieves relevant context and synthesizes grounded answer
 */
export async function executeRAGQuery({
  query,
  userId,
  documentId,
  maxChunks = 5,
}: ExecuteRAGQueryParams): Promise<RAGQueryResult> {
  // 1. Retrieve hybrid context
  const context = await retrieveHybridContext({
    query,
    userId,
    documentId,
    limitChunks: maxChunks,
  });

  if (!context.formattedContext || context.chunks.length === 0) {
    return {
      answer: "No relevant documents or facts were found matching your query.",
      query,
      sources: [],
      entitiesUsed: [],
      model: OPENROUTER_CONFIG.chatModel,
    };
  }

  // 2. Synthesize answer with OpenRouter LLM
  const userPrompt = `
Context Information:
---------------------
${context.formattedContext}
---------------------

User Question:
${query}

Answer the question based strictly on the context above:
`.trim();

  const answer = await completeRAGAnswer(RAG_SYSTEM_PROMPT, userPrompt);

  // 3. Structure return result with sources
  const sources = context.chunks.map((c) => ({
    chunkId: c.chunkId,
    documentId: c.documentId,
    pageNum: c.pageNum,
    sectionTitle: c.sectionTitle,
    snippet: c.text.length > 200 ? `${c.text.substring(0, 200)}...` : c.text,
    relevanceScore: c.score,
  }));

  const entitiesUsed = context.graphEntities.map((e) => e.name);

  return {
    answer,
    query,
    sources,
    entitiesUsed,
    model: OPENROUTER_CONFIG.chatModel,
  };
}
