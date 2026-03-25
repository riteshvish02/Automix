// lib/tools/types.ts  ← the contract every tool must follow

export interface ToolDefinition {
  schema: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: "object";
        properties: Record<string, any>;
        required: string[];
      };
    };
  };

  provider: "gdrive" | "gmail" | "calendar" | "notion" | "slack" | null;
  //         ↑ registry uses this to know which accessToken to pull from DB

  execute: (
    args: any,             // ← exactly what ChatGPT sends
    accessToken: string | null   // ← your OAuthToken.accessToken from DB
  ) => Promise<ToolResult>;
}

export interface ToolResult {
  success: boolean;
  data?: any;      // anything — object, array, string
  error?: string;  // only on failure
}