// server/src/controllers/ragController.ts — Advanced RAG Controller (Ask & Ingest)

import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { executeRAGQuery } from "../rag/querying/ragQuery";
import { indexPDFDocument, deleteIndexedDocument } from "../rag/indexing/indexDocument";
import { prisma } from "../config/prisma";
import { ErrorHandler } from "../utils/ErrorHandler";

export const ragController = {
  /**
   * POST /api/v1/rag/ask — Ask question with full Advanced RAG pipeline
   */
  async ask(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.userId || (req.headers["user-id"] as string) || "anonymous";
    const { question, chatHistory = [], documentId, maxChunks = 5 } = req.body || {};

    if (!question || typeof question !== "string" || !question.trim()) {
      throw new ErrorHandler("question string is required in request body", 400);
    }

    const result = await executeRAGQuery({
      query: question,
      userId,
      chatHistory,
      documentId,
      maxChunks,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  },

  /**
   * POST /api/v1/rag/upload — Ingest and index PDF document
   */
  async upload(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.userId || (req.headers["user-id"] as string) || "anonymous";
    const file = req.file;

    if (!file) {
      throw new ErrorHandler("PDF file is required (multipart field name: 'file')", 400);
    }

    const startTime = Date.now();
    const documentTitle = req.body.title || file.originalname || "Uploaded Document";

    // Index through hybrid RAG pipeline
    const indexResult = await indexPDFDocument(
      file.path,
      userId,
      documentTitle
    );

    // Record artifact in Prisma DB if available
    try {
      await (prisma as any).artifact.create({
        data: {
          userId,
          type: "file",
          name: documentTitle,
          mimeType: file.mimetype || "application/pdf",
          storagePath: file.path,
          metadata: {
            documentId: indexResult.documentId,
            chunks: indexResult.chunksCreated,
            entities: indexResult.entitiesCreated,
            relations: indexResult.relationsCreated,
          },
        },
      });
    } catch (dbErr: any) {
      console.warn("[RAG Controller] DB artifact record notice:", dbErr.message);
    }

    res.status(200).json({
      success: true,
      message: `Document "${documentTitle}" indexed successfully into Qdrant & Neo4j`,
      data: {
        documentId: indexResult.documentId,
        title: documentTitle,
        chunksCreated: indexResult.chunksCreated,
        entitiesCreated: indexResult.entitiesCreated,
        relationsCreated: indexResult.relationsCreated,
        denseVectorsStored: indexResult.denseVectorsStored,
        sparseVectorsStored: indexResult.sparseVectorsStored,
        durationSeconds: Number(((Date.now() - startTime) / 1000).toFixed(2)),
      },
    });
  },

  /**
   * GET /api/v1/rag/documents — List all indexed documents for authenticated user
   */
  async listDocuments(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.userId || (req.headers["user-id"] as string);
    if (!userId) {
      throw new ErrorHandler("Unauthorized: userId is required", 401);
    }

    const artifacts = await (prisma as any).artifact.findMany({
      where: {
        userId,
        type: "file",
      },
      orderBy: { createdAt: "desc" },
    });

    const documents = artifacts.map((a: any) => ({
      id: a.id,
      documentId: a.metadata?.documentId || a.id,
      title: a.name || "Untitled Document",
      mimeType: a.mimeType,
      chunks: a.metadata?.chunks || 0,
      entities: a.metadata?.entities || 0,
      createdAt: a.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: {
        documents,
      },
    });
  },

  /**
   * DELETE /api/v1/rag/:documentId — Delete document vectors and graph nodes
   */
  async deleteDoc(req: Request, res: Response): Promise<void> {
    const userId = (req as any).user?.userId || (req.headers["user-id"] as string) || "anonymous";
    const rawDocId = req.params.documentId;
    const docId = Array.isArray(rawDocId) ? rawDocId[0] : String(rawDocId || "");

    if (!docId) {
      throw new ErrorHandler("documentId is required", 400);
    }

    await deleteIndexedDocument(docId, userId);

    res.status(200).json({
      success: true,
      message: `Document ${docId} deleted from vector and graph stores.`,
    });
  },
};
