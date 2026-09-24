// server/src/rag/clients/neo4jClient.ts — Neo4j Knowledge Graph Operations

import neo4j, { Driver, Session } from "neo4j-driver";
import { Chunk, Entity, GraphEntityResult, Relation } from "../types";

let driver: Driver | null = null;

export function getNeo4jDriver(): Driver {
  if (driver) return driver;

  const uri = process.env.NEO4J_URI || "bolt://localhost:7687";
  const user = process.env.NEO4J_USER || "neo4j";
  const password = process.env.NEO4J_PASSWORD || "password";

  try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    return driver;
  } catch (err: any) {
    console.warn(`[Neo4j] Warning initializing driver: ${err?.message || err}`);
    throw err;
  }
}

/**
 * Setup Neo4j constraints and indexes
 */
export async function setupNeo4jSchema(): Promise<void> {
  let session: Session | null = null;
  try {
    const neoDriver = getNeo4jDriver();
    session = neoDriver.session();

    await session.run(`
      CREATE CONSTRAINT entity_id IF NOT EXISTS 
      FOR (e:Entity) REQUIRE e.id IS UNIQUE
    `);

    await session.run(`
      CREATE CONSTRAINT document_id IF NOT EXISTS 
      FOR (d:Document) REQUIRE d.id IS UNIQUE
    `);

    await session.run(`
      CREATE INDEX entity_name_idx IF NOT EXISTS 
      FOR (e:Entity) ON (e.name)
    `);

    console.log("✓ Neo4j schema & constraints verified");
  } catch (error: any) {
    console.warn(`[Neo4j] Schema setup notice: ${error?.message || error}`);
  } finally {
    if (session) await session.close();
  }
}

/**
 * Create a Document node
 */
export async function createDocumentNode(
  documentId: string,
  userId: string,
  fileName: string
): Promise<void> {
  const session = getNeo4jDriver().session();
  try {
    await session.run(
      `
      MERGE (d:Document {id: $documentId})
      SET d.userId = $userId,
          d.fileName = $fileName,
          d.indexedAt = timestamp()
      `,
      { documentId, userId, fileName }
    );
  } finally {
    await session.close();
  }
}

/**
 * Store extracted entities in Neo4j
 */
export async function storeEntities(
  documentId: string,
  entities: Entity[]
): Promise<string[]> {
  const session = getNeo4jDriver().session();
  const createdIds: string[] = [];

  try {
    for (const entity of entities) {
      await session.run(
        `
        MERGE (e:Entity {name: $name})
        ON CREATE SET e.id = $id, e.type = $type, e.confidence = $confidence, e.createdAt = timestamp()
        ON MATCH SET e.confidence = CASE WHEN $confidence > e.confidence THEN $confidence ELSE e.confidence END
        WITH e
        MATCH (d:Document {id: $documentId})
        MERGE (d)-[r:MENTIONS]->(e)
        SET r.mentionedInChunks = $chunks,
            r.confidence = $confidence
        RETURN e.id as id
        `,
        {
          id: entity.id,
          name: entity.name.toLowerCase().trim(),
          type: entity.type,
          confidence: entity.confidence,
          documentId,
          chunks: entity.mentionedIn,
        }
      );
      createdIds.push(entity.id);
    }
    return createdIds;
  } finally {
    await session.close();
  }
}

/**
 * Store extracted relations between entities in Neo4j
 */
export async function storeRelations(
  documentId: string,
  relations: Relation[]
): Promise<string[]> {
  const session = getNeo4jDriver().session();
  const createdIds: string[] = [];

  try {
    for (const rel of relations) {
      const sanitizedType = rel.type.replace(/[^A-Za-z0-9_]/g, "_").toUpperCase() || "RELATES_TO";
      await session.run(
        `
        MATCH (s:Entity {name: $source})
        MATCH (t:Entity {name: $target})
        CREATE (s)-[r:\`${sanitizedType}\` {
          id: $relationId,
          confidence: $confidence,
          context: $context,
          documentId: $documentId,
          createdAt: timestamp()
        }]->(t)
        RETURN r.id as id
        `,
        {
          source: rel.sourceEntity.toLowerCase().trim(),
          target: rel.targetEntity.toLowerCase().trim(),
          relationId: rel.id,
          confidence: rel.confidence,
          context: rel.context,
          documentId,
        }
      );
      createdIds.push(rel.id);
    }
    return createdIds;
  } finally {
    await session.close();
  }
}

/**
 * Store chunk metadata nodes in Neo4j for provenance
 */
export async function storeChunks(documentId: string, chunks: Chunk[]): Promise<void> {
  const session = getNeo4jDriver().session();
  try {
    for (const chunk of chunks) {
      await session.run(
        `
        MERGE (c:Chunk {id: $chunkId})
        SET c.pageNum = $pageNum,
            c.sectionTitle = $sectionTitle,
            c.documentId = $documentId
        WITH c
        MATCH (d:Document {id: $documentId})
        MERGE (d)-[r:HAS_CHUNK]->(c)
        `,
        {
          chunkId: chunk.id,
          pageNum: chunk.pageNum,
          sectionTitle: chunk.sectionTitle || "",
          documentId,
        }
      );
    }
  } finally {
    await session.close();
  }
}

/**
 * Query Neo4j for entities and their 1-hop connections
 */
export async function findConnectedEntities(
  entityNames: string[],
  limit: number = 10
): Promise<GraphEntityResult[]> {
  if (entityNames.length === 0) return [];

  const session = getNeo4jDriver().session();
  const lowerNames = entityNames.map((n) => n.toLowerCase().trim());

  try {
    const query = `
      MATCH (e:Entity)
      WHERE e.name IN $entityNames
      OPTIONAL MATCH (e)-[r]->(target:Entity)
      OPTIONAL MATCH (source:Entity)-[inR]->(e)
      RETURN e.id as id, e.name as name, e.type as type,
             collect(DISTINCT { targetName: target.name, relationType: type(r), direction: 'outgoing' }) as outRels,
             collect(DISTINCT { targetName: source.name, relationType: type(inR), direction: 'incoming' }) as inRels
      LIMIT $limit
    `;

    const result = await session.run(query, { entityNames: lowerNames, limit: neo4j.int(limit) });

    return result.records.map((record) => {
      const outRels = record.get("outRels") || [];
      const inRels = record.get("inRels") || [];
      const allRels = [...outRels, ...inRels].filter((r: any) => Boolean(r.targetName && r.relationType));

      return {
        entityId: record.get("id"),
        name: record.get("name"),
        type: record.get("type"),
        relatedEntities: allRels,
        mentionedInChunks: [],
      };
    });
  } catch (error: any) {
    console.warn(`[Neo4j] Graph search notice: ${error?.message || error}`);
    return [];
  } finally {
    await session.close();
  }
}

/**
 * Delete all graph data associated with a document
 */
export async function deleteDocumentGraphData(documentId: string): Promise<void> {
  const session = getNeo4jDriver().session();
  try {
    await session.run(
      `
      MATCH (d:Document {id: $documentId})
      OPTIONAL MATCH (d)-[:HAS_CHUNK]->(c:Chunk)
      OPTIONAL MATCH ()-[r {documentId: $documentId}]->()
      DETACH DELETE c, r, d
      `,
      { documentId }
    );
  } finally {
    await session.close();
  }
}
