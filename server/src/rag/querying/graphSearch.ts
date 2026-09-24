// server/src/rag/querying/graphSearch.ts — Neo4j Knowledge Graph Traversal & Entity Search

import { findConnectedEntities } from "../clients/neo4jClient";
import { completeJson } from "../config/openrouter";
import { GraphEntityResult } from "../types";

/**
 * Extract named entities from a query string using fast LLM or heuristic
 */
export async function extractQueryEntities(query: string): Promise<string[]> {
  try {
    const result = await completeJson<{ entities?: string[] }>(
      "Extract key named entities (people, products, companies, places, technical concepts) from this search query. Return JSON: { \"entities\": [\"entity1\", \"entity2\"] }",
      query
    );

    if (Array.isArray(result.entities) && result.entities.length > 0) {
      return result.entities.map((e) => e.trim().toLowerCase());
    }
  } catch {
    // Fallback: heuristic capitalized words or nouns
  }

  // Fallback: simple tokenization for multi-word proper nouns or keywords
  const words = query
    .split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z0-9_-]/g, "").trim().toLowerCase())
    .filter((w) => w.length > 3);

  return Array.from(new Set(words));
}

/**
 * Search the knowledge graph for connections related to the query
 */
export async function searchKnowledgeGraph(
  query: string,
  limit: number = 8
): Promise<GraphEntityResult[]> {
  try {
    const candidateEntities = await extractQueryEntities(query);
    if (candidateEntities.length === 0) {
      return [];
    }

    const graphResults = await findConnectedEntities(candidateEntities, limit);
    return graphResults;
  } catch (error: any) {
    console.warn(`[GraphSearch] Warning: ${error?.message || error}`);
    return [];
  }
}
