import express from "express";
import { runAgent } from "../agent/llmAgent";

const router = express.Router();

// POST /api/agent/query
router.post("/query", async (req, res) => {
  try {
    const { query, userId } = req.body;
    if (!query) return res.status(400).json({ error: "Missing query" });
    const result = await runAgent(query, userId || "api-user");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err && typeof err === 'object' && 'message' in err ? (err as any).message : String(err) });
  }
});

export default router;
