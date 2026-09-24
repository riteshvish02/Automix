// server/src/rag/querying/hybridRetriever.ts — Unified Hybrid Vector + Graph Retriever

import { searchHybridVectors } from "./vectorSearch";
import { searchKnowledgeGraph } from "./graphSearch";
import { GraphEntityResult, RAGContext, ScoredChunk } from "../types";

export interface RetrieveContextParams {
  query: string;
  userId: string;
  limitChunks?: number;
  limitGraph?: number;
  documentId?: string;
}

/**
 * Formats retrieved chunks and graph facts into a structured string for the LLM
 */
export function formatRAGContext(
  chunks: ScoredChunk[],
  graphEntities: GraphEntityResult[]
): string {
  const sections: string[] = [];

  // 1. Chunks context
  if (chunks.length > 0) {
    const chunkSnippets = chunks.map((c, i) => {
      const heading = c.sectionTitle ? ` (Section: "${c.sectionTitle}")` : "";
      return `[Source ${i + 1} | Page ${c.pageNum}${heading}]:\n${c.text}`;
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
        `### Knowledge Graph Facts & Relationships:\n${facts.join("\n")}`
      );
    }
  }

  return sections.join("\n\n---\n\n");
}

/**
 * Retrieve hybrid context from both Vector DB and Graph DB
 */
export async function retrieveHybridContext({
  query,
  userId,
  limitChunks = 5,
  limitGraph = 6,
  documentId,
}: RetrieveContextParams): Promise<RAGContext> {
  // Execute Vector Search and Graph Search in parallel
  const [chunksResult, graphResult] = await Promise.allSettled([
    searchHybridVectors({ query, userId, limit: limitChunks, documentId }),
    searchKnowledgeGraph(query, limitGraph),
  ]);

  const chunks = chunksResult.status === "fulfilled" ? chunksResult.value : [];
  const graphEntities = graphResult.status === "fulfilled" ? graphResult.value : [];

  const formattedContext = formatRAGContext(chunks, graphEntities);

  return {
    chunks,
    graphEntities,
    formattedContext,
  };
}
