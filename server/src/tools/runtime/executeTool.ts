import { TOOL_REGISTRY } from "../registry/toolRegistry";
import { ErrorHandler } from "../../utils/ErrorHandler";

export const executeTool = async ({
  toolName,
  args,
  userId,
}: {
  toolName: string;
  args: any;
  userId: string;
}) => {
  const tool = TOOL_REGISTRY[toolName];
    console.log("Executing tool:", toolName, "with args:", args, "for user:", userId);
  if (!tool) {
    throw new ErrorHandler(`Unknown tool: ${toolName}`, 400);
  }
  console.log("Found tool implementation:", toolName);
  return tool.execute(args, { userId });
};