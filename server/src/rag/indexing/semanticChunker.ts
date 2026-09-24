// server/src/rag/indexing/semanticChunker.ts — Smart Semantic Chunking

import { randomUUID } from "crypto";
import { Chunk } from "../types";

export interface ChunkingConfig {
  targetChunkSize: number; // in words
  overlapSize: number; // in words
  sentenceBuffer: number;
}

const DEFAULT_CONFIG: ChunkingConfig = {
  targetChunkSize: 300,
  overlapSize: 50,
  sentenceBuffer: 2,
};

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function extractSectionTitle(text: string): string | undefined {
  const lines = text.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^(#{1,4}\s+[A-Za-z0-9]|Chapter|Section|Part|[A-Z\s]{5,}:?)/i.test(trimmed)) {
      return trimmed.replace(/^#+\s*/, "").slice(0, 100);
    }
  }
  return undefined;
}

function findPageNumber(charIndex: number, pages?: Array<{ pageNum: number; text: string }>): number {
  if (!pages || pages.length === 0) return 1;

  let totalChars = 0;
  for (const page of pages) {
    totalChars += page.text.length;
    if (charIndex <= totalChars) {
      return page.pageNum;
    }
  }
  return pages[pages.length - 1].pageNum;
}

/**
 * Creates semantic chunks preserving paragraph and sentence boundaries with overlap
 */
export function createSemanticChunks(
  fullText: string,
  pages?: Array<{ pageNum: number; text: string }>,
  config: Partial<ChunkingConfig> = {}
): Chunk[] {
  const finalConfig: ChunkingConfig = { ...DEFAULT_CONFIG, ...config };
  const paragraphs = fullText.split(/\n\s*\n/);

  let charIndex = 0;
  let currentChunk = "";
  let currentChunkStartChar = 0;
  const chunks: Chunk[] = [];

  for (const paragraph of paragraphs) {
    const sentences = splitIntoSentences(paragraph);

    for (const sentence of sentences) {
      const currentWords = currentChunk ? currentChunk.split(/\s+/).length : 0;
      const sentenceWords = sentence.split(/\s+/).length;
      const totalWords = currentWords + sentenceWords;

      if (totalWords > finalConfig.targetChunkSize && currentChunk.length > 0) {
        // Flush current chunk
        const pageNum = findPageNumber(currentChunkStartChar, pages);
        chunks.push({
          id: `chunk_${randomUUID()}`,
          text: currentChunk.trim(),
          pageNum,
          startCharIndex: currentChunkStartChar,
          endCharIndex: charIndex,
          sectionTitle: extractSectionTitle(currentChunk),
        });

        // Calculate overlap sentences from end of current chunk
        const currentSentences = splitIntoSentences(currentChunk);
        const overlapCount = Math.min(
          finalConfig.sentenceBuffer,
          Math.max(1, Math.floor(finalConfig.overlapSize / 20))
        );
        const overlapText = currentSentences.slice(-overlapCount).join(" ");

        currentChunk = overlapText ? `${overlapText} ${sentence}` : sentence;
        currentChunkStartChar = Math.max(0, charIndex - overlapText.length);
      } else {
        currentChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence;
      }

      charIndex += sentence.length + 1;
    }

    charIndex += 2;
  }

  // Push remainder
  if (currentChunk.trim().length > 0) {
    const pageNum = findPageNumber(currentChunkStartChar, pages);
    chunks.push({
      id: `chunk_${randomUUID()}`,
      text: currentChunk.trim(),
      pageNum,
      startCharIndex: currentChunkStartChar,
      endCharIndex: charIndex,
      sectionTitle: extractSectionTitle(currentChunk),
    });
  }

  return chunks;
}

/**
 * Recursive splitter if any single chunk exceeds max words
 */
export function recursiveSplitChunk(chunk: Chunk, maxSize: number = 350): Chunk[] {
  const words = chunk.text.split(/\s+/);
  if (words.length <= maxSize) {
    return [chunk];
  }

  const mid = Math.floor(chunk.text.length / 2);
  const splitPoint = chunk.text.indexOf(" ", mid);
  const cut = splitPoint === -1 ? mid : splitPoint;

  const part1Text = chunk.text.substring(0, cut).trim();
  const part2Text = chunk.text.substring(cut).trim();

  const chunk1: Chunk = {
    ...chunk,
    id: `chunk_${randomUUID()}`,
    text: part1Text,
    endCharIndex: chunk.startCharIndex + cut,
  };

  const chunk2: Chunk = {
    ...chunk,
    id: `chunk_${randomUUID()}`,
    text: part2Text,
    startCharIndex: chunk.startCharIndex + cut + 1,
  };

  return [...recursiveSplitChunk(chunk1, maxSize), ...recursiveSplitChunk(chunk2, maxSize)];
}
