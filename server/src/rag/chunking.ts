// lib/indexing/chunking.ts — Smart semantic chunking

import { Chunk } from '@/types/indexing'
import { v4 as uuid } from 'uuid'

interface ChunkingConfig {
  targetChunkSize: number // words
  overlapSize: number // words
  sentenceBuffer: number // extra sentences to avoid mid-sentence splits
}

const DEFAULT_CONFIG: ChunkingConfig = {
  targetChunkSize: 300,
  overlapSize: 50,
  sentenceBuffer: 2
}

/**
 * Split text into sentences (basic implementation)
 * For production, use sentence-splitter library
 */
function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
}

/**
 * Smart semantic chunking — respects paragraph/sentence boundaries
 */
export function createSemanticChunks(
  fullText: string,
  pages?: Array<{ pageNum: number; text: string }>,
  config: Partial<ChunkingConfig> = {}
): Chunk[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const chunks: Chunk[] = []

  // Split by paragraphs first
  const paragraphs = fullText.split('\n\n')

  let charIndex = 0
  let currentChunk = ''
  let currentChunkStartChar = 0
  let chunkBuffer: Chunk[] = []

  for (const paragraph of paragraphs) {
    const sentences = splitIntoSentences(paragraph)

    for (const sentence of sentences) {
      const currentWords = currentChunk.split(/\s+/).length
      const sentenceWords = sentence.split(/\s+/).length
      const totalWords = currentWords + sentenceWords

      // If adding this sentence exceeds target, flush current chunk
      if (
        totalWords > finalConfig.targetChunkSize &&
        currentChunk.length > 0
      ) {
        // Save chunk
        const pageNum = findPageNumber(currentChunkStartChar, pages)
        chunkBuffer.push({
          id: `chunk_${uuid()}`,
          text: currentChunk.trim(),
          pageNum,
          startCharIndex: currentChunkStartChar,
          endCharIndex: charIndex,
          sectionTitle: extractSectionTitle(currentChunk)
        })

        // Add overlap from end of current chunk to next chunk
        const overlapSentences = Math.ceil(
          (finalConfig.overlapSize / sentenceWords) *
            finalConfig.sentenceBuffer
        )
        const currentSentences = currentChunk.split(/(?<=[.!?])\s+/)
        const overlapText = currentSentences
          .slice(-overlapSentences)
          .join(' ')

        currentChunk = overlapText + ' ' + sentence
        currentChunkStartChar = charIndex - overlapText.length
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence
      }

      charIndex += sentence.length + 1 // +1 for space
    }

    charIndex += 2 // +2 for paragraph break
  }

  // Don't forget last chunk
  if (currentChunk.trim().length > 0) {
    const pageNum = findPageNumber(currentChunkStartChar, pages)
    chunkBuffer.push({
      id: `chunk_${uuid()}`,
      text: currentChunk.trim(),
      pageNum,
      startCharIndex: currentChunkStartChar,
      endCharIndex: charIndex,
      sectionTitle: extractSectionTitle(currentChunk)
    })
  }

  return chunkBuffer
}

/**
 * Find which page a character index belongs to
 */
function findPageNumber(
  charIndex: number,
  pages?: Array<{ pageNum: number; text: string }>
): number {
  if (!pages) return 1

  let totalChars = 0
  for (const page of pages) {
    totalChars += page.text.length
    if (charIndex < totalChars) {
      return page.pageNum
    }
  }

  return pages.length
}

/**
 * Extract section title from chunk (first heading-like line)
 */
function extractSectionTitle(text: string): string | undefined {
  const lines = text.split('\n')
  for (const line of lines) {
    // Look for lines that look like headings
    if (line.match(/^(#{1,4}|[A-Z][A-Z\s]{5,}|Chapter|Section|Part)/)) {
      return line.replace(/^#+\s*/, '').slice(0, 100)
    }
  }
  return undefined
}

/**
 * Recursive splitting for very long texts (rarely needed)
 */
export function recursiveSplitChunk(
  chunk: Chunk,
  maxSize: number = 300
): Chunk[] {
  const wordCount = chunk.text.split(/\s+/).length
  if (wordCount <= maxSize) {
    return [chunk]
  }

  // Split in half and recurse
  const midPoint = Math.floor(chunk.text.length / 2)
  const nearestSpace = chunk.text.lastIndexOf(' ', midPoint)

  const firstHalf = chunk.text.substring(0, nearestSpace)
  const secondHalf = chunk.text.substring(nearestSpace + 1)

  const chunk1: Chunk = {
    ...chunk,
    id: `chunk_${uuid()}`,
    text: firstHalf,
    endCharIndex: chunk.startCharIndex + nearestSpace
  }

  const chunk2: Chunk = {
    ...chunk,
    id: `chunk_${uuid()}`,
    text: secondHalf,
    startCharIndex: chunk.startCharIndex + nearestSpace + 1
  }

  return [
    ...recursiveSplitChunk(chunk1, maxSize),
    ...recursiveSplitChunk(chunk2, maxSize)
  ]
}