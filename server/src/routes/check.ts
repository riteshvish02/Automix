import { Request, Response } from "express";
import { executeTool } from "../tools/runtime/executeTool";

export const runToolManually = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId; // depending on your auth middleware
  const { toolName, args } = req.body;
  console.log("Received request to run tool:", toolName, "with args:", args, "for user:", userId);
  const result = await executeTool({
    toolName,
    args,
    userId,
  });

  return res.status(200).json({
    success: true,
    result,
  });
};