// agent/llmAgent.ts
// This file will be the entry point for LLM-powered reasoning and tool chaining in your Node.js backend.
// Step 2: Reasoning & chaining (LLM agent integration placeholder)

/**
 * This is a placeholder for your LLM agent integration.
 * In the next step, you will connect this to OpenAI (or another LLM) and orchestrate tool calls from your TOOL_REGISTRY.
 * For now, this file just exports a stub function.
 */

import { SYSTEM_PROMPT } from "./promptTemplates";
import { callOpenAIWithTools } from "./openaiClient";
import { TOOL_REGISTRY } from "../tools/registry/toolRegistry";

export async function runAgent(userQuery: string, userId: string = 'test-user') {
  let messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userQuery }
  ];
  let loopCount = 0;
  while (loopCount < 8) { // prevent infinite loops
    const response = await callOpenAIWithTools(messages);
    const msg = response.choices[0].message;
    if (msg.function_call) {
      // LLM wants to call a tool
      const fnName = msg.function_call.name;
      const fnArgs = JSON.parse(msg.function_call.arguments || '{}');
      const tool = TOOL_REGISTRY[fnName];
      if (!tool) {
        messages.push({ role: "assistant", content: `Tool ${fnName} not found.` });
        break;
      }
      let toolResult;
      try {
        toolResult = await tool.execute(fnArgs, { userId });
      } catch (err) {
        const errorMsg = err && typeof err === 'object' && 'message' in err ? (err as any).message : String(err);
        toolResult = { error: errorMsg };
      }
      messages.push({
        role: "function",
        name: fnName,
        content: JSON.stringify(toolResult)
      } as any);
      loopCount++;
      continue;
    } else if (msg.content) {
      // LLM is done and has a final answer
      return { message: msg.content };
    } else {
      break;
    }
  }
  return { message: "LLM agent finished or hit loop limit." };
}
