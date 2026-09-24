// server/src/rag/indexing/indexDocument.ts — Master Indexing Pipeline Orchestrator

import { randomUUID } from "crypto";
import { extractPDFContent, cleanText } from "./pdfParser";
import { createSemanticChunks, recursiveSplitChunk } from "./semanticChunker";
import {
  generateBatchDenseEmbeddings,
  generateSparseVector,
  normalizeVector,
} from "./embeddings";
import {
  extractEntitiesFromChunks,
  mergeEntitiesAcrossChunks,
  linkRelationsToEntities,
} from "./entityExtractor";
import {
  initializeQdrantCollections,
  storeDenseVectors,
  storeSparseVectors,
  deleteDocumentVectors,
} from "../clients/qdrantClient";
import {
  setupNeo4jSchema,
  createDocumentNode,
  storeChunks,
  storeEntities,
  storeRelations,
  deleteDocumentGraphData,
} from "../clients/neo4jClient";
import { Chunk, IndexingResult, SparseVector } from "../types";

export type ProgressCallback = (stage: string, percent: number) => void;

/**
 * Main Indexing Pipeline: PDF -> Chunks -> Embeddings & Graph -> Storage
 */
export async function indexPDFDocument(
  pdfFilePath: string,
  userId: string,
  documentTitle: string,
  onProgress?: ProgressCallback
): Promise<IndexingResult> {
  const documentId = `doc_${randomUUID()}`;
  const startTime = Date.now();

  try {
    // 1. Initialize databases
    await initializeQdrantCollections().catch((e) =>
      console.warn("[Qdrant] Notice on init:", e.message)
    );
    await setupNeo4jSchema().catch((e) =>
      console.warn("[Neo4j] Notice on schema setup:", e.message)
    );

    // 2. Extract PDF
    onProgress?.("extracting", 10);
    const pdfData = await extractPDFContent(pdfFilePath);
    const cleanedText = cleanText(pdfData.fullText);

    // 3. Chunking
    onProgress?.("chunking", 25);
    const rawChunks = createSemanticChunks(cleanedText, pdfData.pages, {
      targetChunkSize: 300,
      overlapSize: 50,
      sentenceBuffer: 2,
    });

    const chunks: Chunk[] = [];
    for (const c of rawChunks) {
      chunks.push(...recursiveSplitChunk(c, 350));
    }
    const chunkMap = new Map(chunks.map((c) => [c.id, c]));

    // 4. Dense Embeddings via OpenRouter
    onProgress?.("dense_embeddings", 45);
    const chunkTexts = chunks.map((c) => c.text);
    const rawDense = await generateBatchDenseEmbeddings(chunkTexts, 8);
    const denseVectors = chunks.map((chunk, i) => ({
      chunkId: chunk.id,
      vector: normalizeVector(rawDense[i] || []),
    }));

    // 5. Sparse BM25 Vectors
    onProgress?.("sparse_embeddings", 60);
    const sparseVectorMap = new Map<string, SparseVector>();
    for (const chunk of chunks) {
      sparseVectorMap.set(chunk.id, generateSparseVector(chunk.id, chunk.text, 100));
    }

    // 6. Entity & Relation Extraction (Knowledge Graph)
    onProgress?.("graph_extraction", 75);
    let entityIds: string[] = [];
    let relationIds: string[] = [];

    try {
      const entityMap = await extractEntitiesFromChunks(
        chunks.map((c) => ({ id: c.id, text: c.text })),
        3,
        250
      );

      const uniqueEntities = mergeEntitiesAcrossChunks(entityMap);
      const allRelations = Array.from(entityMap.values()).flatMap((r) => r.relations);
      const linkedRelations = linkRelationsToEntities(allRelations, uniqueEntities);

      // Store in Neo4j
      await createDocumentNode(documentId, userId, documentTitle);
      await storeChunks(documentId, chunks);
      entityIds = await storeEntities(documentId, Array.from(uniqueEntities.values()));
      relationIds = await storeRelations(documentId, linkedRelations);
    } catch (graphErr: any) {
      console.warn("[Neo4j] Graph extraction notice (continuing vector indexing):", graphErr.message);
    }

    // 7. Store Vectors in Qdrant
    onProgress?.("vector_storage", 90);
    const qdrantDenseIds = await storeDenseVectors(
      denseVectors,
      userId,
      documentId,
      chunkMap
    ).catch((err) => {
      console.warn("[Qdrant] Dense store error:", err.message);
      return [];
    });

    const qdrantSparseIds = await storeSparseVectors(
      chunks,
      userId,
      documentId,
      sparseVectorMap
    ).catch((err) => {
      console.warn("[Qdrant] Sparse store error:", err.message);
      return [];
    });

    onProgress?.("completed", 100);

    const completedAt = Date.now();
    const result: IndexingResult = {
      documentId,
      success: true,
      chunksCreated: chunks.length,
      entitiesCreated: entityIds.length,
      relationsCreated: relationIds.length,
      denseVectorsStored: qdrantDenseIds.length,
      sparseVectorsStored: qdrantSparseIds.length,
      qdrantIds: [...qdrantDenseIds, ...qdrantSparseIds],
      neo4jEntityIds: entityIds,
      neo4jRelationIds: relationIds,
      completedAt,
    };

    console.log(
      `✓ Document ${documentId} indexed in ${((completedAt - startTime) / 1000).toFixed(1)}s: ` +
        `${chunks.length} chunks, ${entityIds.length} entities, ${relationIds.length} relations`
    );

    return result;
  } catch (error: any) {
    console.error(`[Indexing Pipeline] Error on ${documentTitle}:`, error?.message || error);
    throw error;
  }
}

/**
 * Delete a document's indexed data across both Qdrant and Neo4j
 */
export async function deleteIndexedDocument(
  documentId: string,
  userId: string
): Promise<void> {
  await Promise.allSettled([
    deleteDocumentVectors(documentId, userId),
    deleteDocumentGraphData(documentId),
  ]);
}
