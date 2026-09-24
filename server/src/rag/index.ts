// server/src/rag/index.ts — Unified RAG Module Entrypoint

// Export Types
export * from "./types";

// Export Indexing Pipeline
export { indexPDFDocument, deleteIndexedDocument } from "./indexing/indexDocument";
export { createSemanticChunks, recursiveSplitChunk } from "./indexing/semanticChunker";
export { extractPDFContent, cleanText } from "./indexing/pdfParser";
export { generateDenseEmbedding, generateBatchDenseEmbeddings, generateSparseVector } from "./indexing/embeddings";
export { extractEntitiesFromChunks, mergeEntitiesAcrossChunks, linkRelationsToEntities } from "./indexing/entityExtractor";

// Export Querying Pipeline
export { searchHybridVectors } from "./querying/vectorSearch";
export { searchKnowledgeGraph } from "./querying/graphSearch";
export { retrieveHybridContext, formatRAGContext } from "./querying/hybridRetriever";
export { executeRAGQuery } from "./querying/ragQuery";

// Export Database Clients
export { getQdrantClient, initializeQdrantCollections } from "./clients/qdrantClient";
export { getNeo4jDriver, setupNeo4jSchema } from "./clients/neo4jClient";

// Export OpenRouter Config
export { openRouterClient, OPENROUTER_CONFIG } from "./config/openrouter";