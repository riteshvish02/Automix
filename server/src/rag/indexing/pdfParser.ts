// server/src/rag/indexing/pdfParser.ts — PDF Text Extraction and Cleaning using pdf-parse v2

import * as fs from "fs";

export interface ExtractedPDFContent {
  fullText: string;
  pages: Array<{
    pageNum: number;
    text: string;
  }>;
  metadata: {
    title?: string;
    author?: string;
    totalPages: number;
  };
}

/**
 * Clean raw text: normalize line endings, remove excessive blank lines and spaces
 */
export function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n\s+\n/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

/**
 * Extract text and page metadata from PDF file using pdf-parse
 */
export async function extractPDFContent(filePath: string): Promise<ExtractedPDFContent> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`PDF file not found at: ${filePath}`);
  }

  const pdfBuffer = fs.readFileSync(filePath);

  // Dynamically import PDFParse to support ESM/CJS packaging
  const { PDFParse } = (await import("pdf-parse")) as any;
  const parser = new PDFParse({ data: pdfBuffer });
  const textResult = await parser.getText();

  const fullText = cleanText(textResult.text || "");
  const totalPages = textResult.total || (textResult.pages ? textResult.pages.length : 1);

  const pages: Array<{ pageNum: number; text: string }> = [];

  if (Array.isArray(textResult.pages) && textResult.pages.length > 0) {
    textResult.pages.forEach((p: any, idx: number) => {
      const pageText = cleanText(p.text || "");
      if (pageText.length > 0) {
        pages.push({ pageNum: idx + 1, text: pageText });
      }
    });
  }

  // Fallback if pages array is empty but fullText exists
  if (pages.length === 0) {
    pages.push({ pageNum: 1, text: fullText });
  }

  let info: any = {};
  try {
    const infoResult = await parser.getInfo();
    info = infoResult?.info || {};
  } catch {
    // Info extraction optional
  }

  return {
    fullText,
    pages,
    metadata: {
      title: info.Title || undefined,
      author: info.Author || undefined,
      totalPages,
    },
  };
}
