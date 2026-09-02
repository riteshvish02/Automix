// types/indexing.ts — All types for indexing pipeline

export interface Chunk {
  id: string
  text: string
  pageNum: number
  sectionTitle?: string
  startCharIndex: number
  endCharIndex: number
}

export interface Entity {
  id: string
  name: string
  type: 'PERSON' | 'ORG' | 'LOCATION' | 'CONCEPT' | 'PRODUCT' | 'OTHER'
  confidence: number
  mentionedIn: string[] // chunk IDs where mentioned
}

export interface Relation {
  id: string
  sourceEntity: string
  targetEntity: string
  type: string // e.g., "WORKS_FOR", "LOCATED_IN", "IS_A"
  context: string // chunk text where relation mentioned
  confidence: number
}

export interface DenseVector {
  chunkId: string
  vector: number[]
  score?: number
}

export interface SparseVector {
  chunkId: string
  indices: number[] // non-zero dimensions (BM25)
  values: number[] // corresponding values
  score?: number
}

export interface IndexMetadata {
  documentId: string
  userId: string
  fileName: string
  uploadedAt: number
  expiresAt: number // for cleanup
  totalChunks: number
  qdrantIds: string[]
  neo4jEntityIds: string[]
  neo4jRelationIds: string[]
  indexingStatus: 'pending' | 'in_progress' | 'completed' | 'failed'
  error?: string
}

export interface IndexingProgress {
  documentId: string
  stage: 'extracting' | 'chunking' | 'embedding' | 'graph_extraction' | 'indexing_qdrant' | 'indexing_neo4j' | 'completed' | 'failed'
  progress: number // 0-100
  message: string
}

export interface IndexingResult {
  documentId: string
  success: boolean
  chunksCreated: number
  entitiesCreated: number
  relationsCreated: number
  denseVectorsStored: number
  sparseVectorsStored: number
  qdrantIds: string[]
  neo4jEntityIds: string[]
  neo4jRelationIds: string[]
  completedAt: number
  error?: string
}