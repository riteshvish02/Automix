// server/src/rag/types.ts — Centralized Types for Indexing and Querying

export interface Chunk {
  id: string;
  text: string;
  pageNum: number;
  sectionTitle?: string;
  startCharIndex: number;
  endCharIndex: number;
}

export interface Entity {
  id: string;
  name: string;
  type: "PERSON" | "ORG" | "LOCATION" | "CONCEPT" | "PRODUCT" | "OTHER";
  confidence: number;
  mentionedIn: string[]; // chunk IDs
}

export interface Relation {
  id: string;
  sourceEntity: string;
  targetEntity: string;
  type: string; // e.g. "WORKS_FOR", "LOCATED_IN", "IS_A"
  context: string;
  confidence: number;
}

export interface DenseVector {
  chunkId: string;
  vector: number[];
  score?: number;
}

export interface SparseVectorItem {
  index: number;
  value: number;
}

export interface SparseVector {
  chunkId: string;
  vector: SparseVectorItem[];
  score?: number;
}

export interface IndexMetadata {
  documentId: string;
  userId: string;
  fileName: string;
  uploadedAt: number;
  totalChunks: number;
  qdrantIds: string[];
  neo4jEntityIds: string[];
  neo4jRelationIds: string[];
  indexingStatus: "pending" | "in_progress" | "completed" | "failed";
  error?: string;
}

export interface IndexingResult {
  documentId: string;
  success: boolean;
  chunksCreated: number;
  entitiesCreated: number;
  relationsCreated: number;
  denseVectorsStored: number;
  sparseVectorsStored: number;
  qdrantIds: string[];
  neo4jEntityIds: string[];
  neo4jRelationIds: string[];
  completedAt: number;
  error?: string;
}

// ── Querying Types ──

export interface ScoredChunk {
  chunkId: string;
  documentId: string;
  text: string;
  pageNum: number;
  sectionTitle?: string;
  score: number;
  source: "dense" | "sparse" | "hybrid";
}

export interface GraphEntityResult {
  entityId: string;
  name: string;
  type: string;
  relatedEntities: Array<{
    targetName: string;
    relationType: string;
    direction: "outgoing" | "incoming";
  }>;
  mentionedInChunks: string[];
}

export interface RAGContext {
  chunks: ScoredChunk[];
  graphEntities: GraphEntityResult[];
  formattedContext: string;
}

export interface RAGQueryResult {
  answer: string;
  query: string;
  sources: Array<{
    chunkId: string;
    documentId: string;
    pageNum: number;
    sectionTitle?: string;
    snippet: string;
    relevanceScore: number;
  }>;
  entitiesUsed: string[];
  model: string;
}