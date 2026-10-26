// server/src/rag/querying/hybridRetriever.ts — Advanced Orchestrator: Rewrite -> Multi-Query Hybrid Search -> Deduplicate -> Rerank -> Compress

import { smartQueryRewrite } from "./queryRewriter";
import { searchHybridVectors } from "./vectorSearch";
import { searchKnowledgeGraph } from "./graphSearch";
import { deduplicateChunks, rerankCandidates } from "./reranker";
import { compressContextChunks } from "./contextCompressor";
import { getDocumentChunks } from "../clients/qdrantClient";
import {
  ChatMessageContext,
  CompressedChunk,
  GraphEntityResult,
  RAGContext,
  ScoredChunk,
} from "../types";

export interface RetrieveContextParams {
  query: string;
  userId: string;
  chatHistory?: ChatMessageContext[];
  limitChunks?: number;
  limitGraph?: number;
  documentId?: string;
  enableCompression?: boolean;
}

/**
 * Formats compressed chunks and graph facts into a structured string for the LLM
 */
export function formatRAGContext(
  chunks: CompressedChunk[],
  graphEntities: GraphEntityResult[]
): string {
  const sections: string[] = [];

  // 1. Chunks context with clean source references
  if (chunks.length > 0) {
    const chunkSnippets = chunks.map((c, i) => {
      const heading = c.sectionTitle ? ` (Section: "${c.sectionTitle}")` : "";
      const docLabel = c.documentName ? `Doc: "${c.documentName}" | ` : "";
      return `[Source ${i + 1} | ${docLabel}Page ${c.pageNum}${heading} | Relevance: ${(c.rerankScore * 100).toFixed(0)}%]:\n${c.compressedText}`;
    });
    sections.push(`### Relevant Document Excerpts:\n${chunkSnippets.join("\n\n")}`);
  }

  // 2. Knowledge Graph Context
  if (graphEntities.length > 0) {
    const facts = graphEntities.flatMap((e) =>
      e.relatedEntities.map(
        (rel) =>
          `- ${e.name} [${e.type}] --(${rel.relationType})--> ${rel.targetName}`
      )
    );

    if (facts.length > 0) {
      sections.push(
        `### Knowledge Graph Facts & Verified Relationships:\n${facts.join("\n")}`
      );
    }
  }

  return sections.join("\n\n---\n\n");
}

/**
 * Production Advanced Hybrid Retriever:
 * 1. Query Rewrite (de-reference + multi-query expansion)
 * 2. Parallel Hybrid Search (Dense + BM25) for all query variations
 * 3. Neo4j Graph Search for extracted entities
 * 4. Deduplication
 * 5. Cross-Encoder Reranking (top 20 candidates -> top 5)
 * 6. Context Compression
 */
export async function retrieveHybridContext({
  query,
  userId,
  chatHistory = [],
  limitChunks = 5,
  limitGraph = 6,
  documentId,
  enableCompression = true,
}: RetrieveContextParams): Promise<RAGContext> {
  const startTime = Date.now();

  // Step 1: Topic 2 — Query Rewriting & Expansion
  const rewriteResult = await smartQueryRewrite(query, chatHistory);
  console.log(`[Retrieval Pipeline] Original query: "${rewriteResult.originalQuery}"`);
  console.log(`[Retrieval Pipeline] Rewritten queries:`, rewriteResult.rewrittenQueries);

  // Step 2 & 3: Topic 3 — Parallel Hybrid Vector Searches + Graph Search
  const vectorSearchPromises = rewriteResult.rewrittenQueries.map((q) =>
    searchHybridVectors({
      query: q,
      userId,
      limit: 6, // pool candidates
      documentId,
    })
  );

  const graphSearchPromise = rewriteResult.extractedEntities.length > 0
    ? searchKnowledgeGraph(rewriteResult.extractedEntities.join(" "), limitGraph)
    : Promise.resolve<GraphEntityResult[]>([]);

  const [vectorSearchSettled, graphResult] = await Promise.all([
    Promise.allSettled(vectorSearchPromises),
    graphSearchPromise,
  ]);

  // Flatten candidates
  const allCandidates: ScoredChunk[] = [];
  for (const res of vectorSearchSettled) {
    if (res.status === "fulfilled") {
      allCandidates.push(...res.value);
    }
  }

  // Deduplicate candidates by chunkId
  let uniqueCandidates = deduplicateChunks(allCandidates);
  console.log(`[Retrieval Pipeline] ${uniqueCandidates.length} unique candidates found across all variations`);

  // Fallback: If vector search found 0 candidates (e.g. "summarize this pdf" or non-keyword query),
  // retrieve the user's indexed document chunks directly so summarization never fails
  if (uniqueCandidates.length === 0) {
    const directChunks = await getDocumentChunks(userId, documentId, limitChunks);
    if (directChunks.length > 0) {
      console.log(`[Retrieval Pipeline] Fallback: fetched ${directChunks.length} document chunks for user ${userId}`);
      uniqueCandidates = directChunks;
    }
  }

  // Step 4: Topic 4 — Cross-Encoder Reranking
  const rerankedChunks = await rerankCandidates(
    rewriteResult.canonicalQuery,
    uniqueCandidates,
    limitChunks,
    uniqueCandidates.length <= 3 ? 0.05 : 0.15
  );

  // Step 5: Topic 5 — Context Compression
  const compressedChunks = enableCompression
    ? await compressContextChunks(rewriteResult.canonicalQuery, rerankedChunks)
    : rerankedChunks.map((c) => ({ ...c, compressedText: c.text }));

  // Step 6: Format Context
  const formattedContext = formatRAGContext(compressedChunks, graphResult);

  console.log(
    `[Retrieval Pipeline] Completed in ${Date.now() - startTime}ms — ${compressedChunks.length} final chunks selected`
  );

  return {
    originalQuery: rewriteResult.originalQuery,
    canonicalQuery: rewriteResult.canonicalQuery,
    rewrittenQueries: rewriteResult.rewrittenQueries,
    chunks: compressedChunks,
    graphEntities: graphResult,
    formattedContext,
  };
}
