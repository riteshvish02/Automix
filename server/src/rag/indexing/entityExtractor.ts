// server/src/rag/indexing/entityExtractor.ts — Knowledge Graph Entity & Relation Extractor

import { randomUUID } from "crypto";
import { completeJson } from "../config/openrouter";
import { Entity, Relation } from "../types";

export interface ExtractionResult {
  entities: Entity[];
  relations: Relation[];
}

const SYSTEM_PROMPT = `
You are an expert knowledge graph extraction engine.
Extract all key named entities (people, organizations, locations, concepts, products) and relationships between them from the provided text.
Always return valid JSON conforming to this schema:
{
  "entities": [
    { "name": "Exact Name", "type": "PERSON|ORG|LOCATION|CONCEPT|PRODUCT|OTHER", "confidence": 0.9 }
  ],
  "relations": [
    { "sourceEntity": "Source Name", "targetEntity": "Target Name", "type": "RELATION_TYPE", "confidence": 0.85 }
  ]
}
Rules:
1. Normalize entity names (e.g. use "Apple Inc." or "Apple" consistently, not "they" or "the company").
2. Relationship type should be an uppercase snake_case verb phrase (e.g. "FOUNDED_BY", "LOCATED_IN", "ACQUIRED", "PARTNERED_WITH").
3. Only extract relations explicitly stated in the text.
`;

/**
 * Extract entities and relations from a single chunk
 */
export async function extractEntitiesFromChunk(
  chunkText: string,
  chunkId: string
): Promise<ExtractionResult> {
  if (!chunkText || chunkText.trim().length < 20) {
    return { entities: [], relations: [] };
  }

  try {
    const rawResult = await completeJson<{
      entities?: Array<{ name: string; type?: string; confidence?: number }>;
      relations?: Array<{
        sourceEntity: string;
        targetEntity: string;
        type?: string;
        confidence?: number;
      }>;
    }>(
      SYSTEM_PROMPT,
      `Analyze this text excerpt and extract entities and relationships:\n\n${chunkText.substring(0, 3000)}`
    );

    const validTypes = new Set(["PERSON", "ORG", "LOCATION", "CONCEPT", "PRODUCT", "OTHER"]);

    const entities: Entity[] = (rawResult.entities || [])
      .filter((e) => e.name && e.name.trim().length > 1)
      .map((e) => ({
        id: `entity_${randomUUID()}`,
        name: e.name.trim(),
        type: validTypes.has(e.type?.toUpperCase() || "")
          ? (e.type!.toUpperCase() as Entity["type"])
          : "OTHER",
        confidence: typeof e.confidence === "number" ? e.confidence : 0.8,
        mentionedIn: [chunkId],
      }));

    const relations: Relation[] = (rawResult.relations || [])
      .filter((r) => r.sourceEntity && r.targetEntity && r.sourceEntity !== r.targetEntity)
      .map((r) => ({
        id: `rel_${randomUUID()}`,
        sourceEntity: r.sourceEntity.trim(),
        targetEntity: r.targetEntity.trim(),
        type: (r.type || "RELATES_TO").toUpperCase().replace(/[^A-Z0-9_]/g, "_"),
        context: chunkText.substring(0, 300),
        confidence: typeof r.confidence === "number" ? r.confidence : 0.75,
      }));

    return { entities, relations };
  } catch (error: any) {
    console.warn(`[EntityExtractor] Notice for chunk ${chunkId}: ${error?.message || error}`);
    return { entities: [], relations: [] };
  }
}

/**
 * Batch extract entities from chunks with concurrency limit
 */
export async function extractEntitiesFromChunks(
  chunks: Array<{ id: string; text: string }>,
  batchSize: number = 3,
  delayMs: number = 300
): Promise<Map<string, ExtractionResult>> {
  const results = new Map<string, ExtractionResult>();

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const batchPromises = batch.map((c) =>
      extractEntitiesFromChunk(c.text, c.id).then((res) => ({ chunkId: c.id, res }))
    );

    const settled = await Promise.all(batchPromises);
    for (const { chunkId, res } of settled) {
      results.set(chunkId, res);
    }

    if (i + batchSize < chunks.length) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  return results;
}

/**
 * Merge entities across chunks (case-insensitive name deduplication)
 */
export function mergeEntitiesAcrossChunks(
  entityMap: Map<string, ExtractionResult>
): Map<string, Entity> {
  const merged = new Map<string, Entity>();

  for (const [chunkId, { entities }] of entityMap.entries()) {
    for (const entity of entities) {
      const key = entity.name.toLowerCase().trim();
      const existing = merged.get(key);

      if (existing) {
        existing.confidence = Math.max(existing.confidence, entity.confidence);
        if (!existing.mentionedIn.includes(chunkId)) {
          existing.mentionedIn.push(chunkId);
        }
      } else {
        merged.set(key, {
          ...entity,
          id: `entity_${randomUUID()}`,
          mentionedIn: [chunkId],
        });
      }
    }
  }

  return merged;
}

/**
 * Link raw relations to merged unique entity IDs
 */
export function linkRelationsToEntities(
  relations: Relation[],
  uniqueEntities: Map<string, Entity>
): Relation[] {
  return relations.map((rel) => {
    const sourceKey = rel.sourceEntity.toLowerCase().trim();
    const targetKey = rel.targetEntity.toLowerCase().trim();

    const sourceObj = uniqueEntities.get(sourceKey);
    const targetObj = uniqueEntities.get(targetKey);

    return {
      ...rel,
      sourceEntity: sourceObj?.name || rel.sourceEntity,
      targetEntity: targetObj?.name || rel.targetEntity,
    };
  });
}
