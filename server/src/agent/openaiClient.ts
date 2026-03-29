// agent/openaiClient.ts
// Step 4: OpenAI function-calling integration for tool orchestration

import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./promptTemplates";
import { TOOL_REGISTRY } from "../tools/registry/toolRegistry";


export const openai = new OpenAI({
  apiKey: "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",
});

// Build OpenAI function definitions from your tool registry
export function getOpenAIFunctions() {
  return Object.values(TOOL_REGISTRY).map(tool => ({
    name: tool.name,
    description: tool.description,
    parameters: {
      type: "object",
      properties: tool.inputSchema,
      required: Object.keys(tool.inputSchema).filter(k => !k.endsWith("?")),
    },
  }));
}

export async function callOpenAIWithTools(messages: any[]) {
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages,
    functions: getOpenAIFunctions(),
    function_call: "auto"
  });
}
