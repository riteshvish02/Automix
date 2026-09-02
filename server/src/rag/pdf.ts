// lib/indexing/pdf.ts — Extract text from PDF
import * as pdfParse from 'pdf-parse'
import * as fs from 'fs'
import * as path from 'path'

export interface ExtractedPDFContent {
  fullText: string
  pages: Array<{
    pageNum: number
    text: string
    width: number
    height: number
  }>
  metadata: {
    title?: string
    author?: string
    creationDate?: string
    totalPages: number
  }
}

/**
 * Extract text from PDF file
 * @param filePath - Absolute path to PDF file
 * @returns Extracted content with page-level info
 */
export async function extractPDFContent(
  filePath: string
): Promise<ExtractedPDFContent> {
  try {
    // Read file into buffer
    const pdfBuffer = fs.readFileSync(filePath)

    // Parse PDF
    const pdfData = await pdfParse(pdfBuffer)

    // Build page-level content
    const pages = pdfData.pages.map((pageData: any, idx: number) => ({
      pageNum: idx + 1,
      text: pageData.content
        .map((item: any) => item.str)
        .join(' ')
        .trim(),
      width: pageData.width,
      height: pageData.height
    }))

    // Combine all pages for full text
    const fullText = pages
      .map(p => `[Page ${p.pageNum}]\n${p.text}`)
      .join('\n\n')

    return {
      fullText,
      pages,
      metadata: {
        title: pdfData.info?.Title,
        author: pdfData.info?.Author,
        creationDate: pdfData.info?.CreationDate,
        totalPages: pdfData.numPages
      }
    }
  } catch (error) {
    throw new Error(
      `Failed to extract PDF content from ${filePath}: ${error.message}`
    )
  }
}

/**
 * Clean extracted text (remove weird characters, extra whitespace)
 */
export function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // normalize line endings
    .replace(/\n\s+\n/g, '\n\n') // remove blank lines with whitespace
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .trim()
}