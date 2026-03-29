export type ToolExecutionContext = {
  userId: string;
};

export type ToolDefinition = {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  execute: (args: any, ctx: ToolExecutionContext) => Promise<any>;
};