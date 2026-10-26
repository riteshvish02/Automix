// server/src/routes/v1/rag.route.ts — Advanced RAG Endpoints

import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { ragController } from "../../controllers/ragController";
import { authMiddleware } from "../../middlewares";
import { catchAsyncError } from "../../utils/catchAsync";

const router = Router();

// Ensure upload directory exists
const UPLOAD_DIR = path.join(process.cwd(), "tmp", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${uniqueSuffix}-${sanitizedName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB max
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are supported for document indexing."));
    }
  },
});

// ── RAG Routes ──

// Ask question with full rewrite, hybrid search, rerank, and citations pipeline
router.post("/ask", authMiddleware.checkAuth, catchAsyncError(ragController.ask));

// Ingest and index PDF document into Qdrant & Neo4j
router.post("/upload", authMiddleware.checkAuth, upload.single("file"), catchAsyncError(ragController.upload));

// Delete document vectors and graph nodes
router.delete("/:documentId", authMiddleware.checkAuth, catchAsyncError(ragController.deleteDoc));

export default router;
