// lib/indexing/entityExtractor.ts — Extract entities and relationships

import Anthropic from '@anthropic-ai/sdk'
import { Entity, Relation } from '@/types/indexing'
import { v4 as uuid } from 'uuid'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

interface ExtractionResult {
  entities: Entity[]
  relations: Relation[]
}

/**
 * Extract entities and relationships from a chunk using Claude
 * Returns structured data for graph DB storage
 */
export async function extractEntitiesAndRelations(
  chunkText: string,
  chunkId: string
): Promise<ExtractionResult> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Extract entities and relationships from this text. Return valid JSON only (no markdown, no code blocks).

Format:
{
  "entities": [
    {"name": "entity name", "type": "PERSON|ORG|LOCATION|CONCEPT|PRODUCT|OTHER", "confidence": 0.95}
  ],
  "relations": [
    {"sourceEntity": "name1", "targetEntity": "name2", "type": "RELATION_TYPE", "confidence": 0.9}
  ]
}

Text:
${chunkText.substring(0, 2000)}`
        }
      ]
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    // Parse JSON from response
    let extractedData
    try {
      extractedData = JSON.parse(content.text)
    } catch {
      // Try to extract JSON if it's wrapped in markdown
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        console.warn('Could not parse extraction response, returning empty')
        return { entities: [], relations: [] }
      }
      extractedData = JSON.parse(jsonMatch[0])
    }

    // Convert to our types with IDs
    const entities: Entity[] = (extractedData.entities || []).map(
      (e: any) => ({
        id: `entity_${uuid()}`,
        name: e.name,
        type: e.type || 'OTHER',
        confidence: e.confidence || 0.5,
        mentionedIn: [chunkId]
      })
    )

    const relations: Relation[] = (extractedData.relations || [])
      .map((r: any) => ({
        id: `relation_${uuid()}`,
        sourceEntity: r.sourceEntity,
        targetEntity: r.targetEntity,
        type: r.type || 'RELATES_TO',
        context: chunkText.substring(0, 500),
        confidence: r.confidence || 0.5
      }))

    return { entities, relations }
  } catch (error) {
    console.error(`Entity extraction failed for chunk ${chunkId}:`, error)
    return { entities: [], relations: [] }
  }
}

/**
 * Batch extract entities from multiple chunks
 */
export async function extractEntitiesFromChunks(
  chunks: Array<{ id: string; text: string }>,
  batchSize: number = 5,
  delayMs: number = 500
): Promise<Map<string, ExtractionResult>> {
  const results = new Map<string, ExtractionResult>()

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize)

    console.log(
      `Extracting entities from chunks ${i + 1}/${chunks.length}`
    )

    const batchResults = await Promise.all(
      batch.map(chunk =>
        extractEntitiesAndRelations(chunk.text, chunk.id)
          .then(result => ({ chunkId: chunk.id, result }))
          .catch(err => {
            console.error(`Error processing chunk ${chunk.id}:`, err)
            return { chunkId: chunk.id, result: { entities: [], relations: [] } }
          })
      )
    )

    for (const { chunkId, result } of batchResults) {
      results.set(chunkId, result)
    }

    // Rate limiting between batches
    if (i + batchSize < chunks.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }

  return results
}

/**
 * Deduplicate and merge entities across chunks
 * Entities with same name are considered same entity
 */
export function mergeEntitiesAcrossChunks(
  entityMap: Map<string, ExtractionResult>
): Map<string, Entity> {
  const uniqueEntities = new Map<string, Entity>()

  for (const [chunkId, { entities }] of entityMap.entries()) {
    for (const entity of entities) {
      const key = entity.name.toLowerCase()

      if (uniqueEntities.has(key)) {
        // Merge — update confidence and mentions
        const existing = uniqueEntities.get(key)!
        existing.confidence = Math.max(existing.confidence, entity.confidence)
        existing.mentionedIn = Array.from(
          new Set([...existing.mentionedIn, chunkId])
        )
      } else {
        uniqueEntities.set(key, { ...entity, id: `entity_${uuid()}` })
      }
    }
  }

  return uniqueEntities
}

/**
 * Link relations to merged entities (by name)
 */
export function linkRelationsToEntities(
  relations: Relation[],
  uniqueEntities: Map<string, Entity>
): Relation[] {
  return relations.map(rel => {
    const sourceEntity = Array.from(uniqueEntities.values()).find(
      e => e.name.toLowerCase() === rel.sourceEntity.toLowerCase()
    )
    const targetEntity = Array.from(uniqueEntities.values()).find(
      e => e.name.toLowerCase() === rel.targetEntity.toLowerCase()
    )

    return {
      ...rel,
      sourceEntity: sourceEntity?.id || rel.sourceEntity,
      targetEntity: targetEntity?.id || rel.targetEntity
    }
  })
}

/**
 * Classify entity type (rule-based fallback if extraction failed)
 */
export function classifyEntityType(
  name: string,
  context?: string
): Entity['type'] {
  const lowerName = name.toLowerCase()

  // Simple rules (in production, use ML model)
  if (
    lowerName.match(
      /(company|corp|inc|ltd|llc|organization|association|institute)/i
    )
  ) {
    return 'ORG'
  }

  if (lowerName.match(/(city|country|state|province|region|district|area)/i)) {
    return 'LOCATION'
  }

  if (lowerName.match(/(product|software|app|tool|service|system)/i)) {
    return 'PRODUCT'
  }

  if (
    lowerName.match(
      /(theory|concept|method|principle|algorithm|framework|model|approach)/i
    )
  ) {
    return 'CONCEPT'
  }

  if (context?.match(new RegExp(name + '.*?(?:is|was).*?(?:a|an).*?(?:person|man|woman|author|scientist)', 'i'))) {
    return 'PERSON'
  }

  return 'OTHER'
}