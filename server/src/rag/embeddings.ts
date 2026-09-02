// lib/indexing/embeddings.ts — Dense and sparse embeddings

import Anthropic from '@anthropic-ai/sdk'
import { DenseVector, SparseVector } from '@/types/indexing'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

/**
 * Generate dense embedding using Anthropic's embedding model
 * Using text-embedding-3-small for speed/cost
 */
export async function generateDenseEmbedding(
  text: string
): Promise<number[]> {
  try {
    const response = await anthropic.beta.messages.create(
      {
        model: 'claude-opus-4-1-20250805',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Generate a 1536-dimensional embedding vector for this text as a JSON array. Return ONLY the array, no other text:\n\n${text.substring(0, 1000)}`
          }
        ]
      },
      {
        headers: {
          'anthropic-beta': 'interleaved-thinking-2025-05-14'
        }
      }
    )

    // Extract embedding from response
    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    // Parse JSON array from response
    const jsonMatch = content.text.match(/\[[\d\.,\-\s]+\]/)
    if (!jsonMatch) {
      throw new Error('Could not parse embedding array from response')
    }

    return JSON.parse(jsonMatch[0])
  } catch (error) {
    throw new Error(`Failed to generate embedding: ${error.message}`)
  }
}

/**
 * BM25-style sparse vector generation
 * Returns top K non-zero dimensions (term importance)
 */
export async function generateSparseVector(
  text: string,
  topK: number = 100
): Promise<SparseVector['vector']> {
  // Tokenize
  const tokens = tokenize(text)
  
  // Calculate term frequencies
  const termFreq = new Map<string, number>()
  for (const token of tokens) {
    termFreq.set(token, (termFreq.get(token) || 0) + 1)
  }

  // Simple vocabulary-based indexing
  // In production, use proper BM25 library (rank_bm25)
  const vocabulary = getVocabulary()
  const indices: number[] = []
  const values: number[] = []

  for (const [term, freq] of termFreq.entries()) {
    const vocabIdx = vocabulary.indexOf(term)
    if (vocabIdx !== -1) {
      indices.push(vocabIdx)
      // TF-IDF approximation
      values.push(Math.log(1 + freq) / Math.sqrt(tokens.length))
    }
  }

  // Sort by value and take top K
  const sorted = indices
    .map((idx, i) => ({ idx, value: values[i] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topK)

  return sorted.map(item => ({
    index: item.idx,
    value: item.value
  }))
}

/**
 * Tokenize text (simple implementation)
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(token => token.length > 2) // Remove short tokens
}

/**
 * Get or build vocabulary (in production, use pre-trained vocab)
 */
function getVocabulary(): string[] {
  // This is a minimal vocab — in production, use 10k+ term vocab
  return [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
  ]
}

/**
 * Batch generate embeddings for multiple texts
 */
export async function generateBatchDenseEmbeddings(
  texts: string[],
  batchSize: number = 10
): Promise<number[][]> {
  const embeddings: number[][] = []
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize)
    
    console.log(`Generating embeddings ${i + 1}/${texts.length}`)
    
    const batchEmbeddings = await Promise.all(
      batch.map(text => generateDenseEmbedding(text))
    )
    
    embeddings.push(...batchEmbeddings)
    
    // Rate limiting — wait between batches (Anthropic API limits)
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  return embeddings
}

/**
 * Normalize embedding vector (to unit length)
 */
export function normalizeEmbedding(embedding: number[]): number[] {
  const norm = Math.sqrt(
    embedding.reduce((sum, val) => sum + val * val, 0)
  )
  
  if (norm === 0) return embedding
  
  return embedding.map(val => val / norm)
}