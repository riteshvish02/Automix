// server/src/rag/index.ts — Unified Advanced RAG Module Entrypoint

// ── Types ──
export * from "./types";

// ── Indexing Pipeline (Topic 1) ──
export { indexPDFDocument, deleteIndexedDocument } from "./indexing/indexDocument";
export { createSemanticChunks, recursiveSplitChunk } from "./indexing/semanticChunker";
export { extractPDFContent, cleanText } from "./indexing/pdfParser";
export { generateDenseEmbedding, generateBatchDenseEmbeddings, generateSparseVector } from "./indexing/embeddings";
export { extractEntitiesFromChunks, mergeEntitiesAcrossChunks, linkRelationsToEntities } from "./indexing/entityExtractor";

// ── Querying Pipeline (Topics 2, 3, 4, 5, 6, 7) ──
export { smartQueryRewrite } from "./querying/queryRewriter";
export { searchHybridVectors } from "./querying/vectorSearch";
export { searchKnowledgeGraph, extractQueryEntities } from "./querying/graphSearch";
export { deduplicateChunks, rerankCandidates } from "./querying/reranker";
export { compressContextChunks } from "./querying/contextCompressor";
export { retrieveHybridContext, formatRAGContext } from "./querying/hybridRetriever";
export { executeRAGQuery } from "./querying/ragQuery";

// ── Database Clients ──
export { getQdrantClient, initializeQdrantCollections } from "./clients/qdrantClient";
export { getNeo4jDriver, setupNeo4jSchema } from "./clients/neo4jClient";

// ── OpenRouter Central Config ──
export { openRouterClient, OPENROUTER_CONFIG } from "./config/openrouter";