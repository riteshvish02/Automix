// agent/promptTemplates.ts
// Step 3: Prompt engineering for LLM agent

/**
 * This file contains prompt templates and example tasks for guiding the LLM agent.
 * You will use these prompts when calling OpenAI or another LLM for multi-step reasoning and tool chaining.
 */

export const SYSTEM_PROMPT = `
You are an AI assistant with access to a set of tools. For any user request, break it down into steps, call the right tools, and use outputs as needed to complete the task.
- Always explain your reasoning step by step.
- If a task requires multiple tools, plan the workflow and call tools in sequence.
- Use the output of one tool as input for the next when needed.
- If you need clarification, ask the user.
`;

export const EXAMPLE_TASKS = [
  {
    user: "Find my latest resume and email it to vkarmaritesh@gmail.com.",
    reasoning: [
      "Search Google Drive for resume files.",
      "Pick the most recent file.",
      "Download the file.",
      "Send it as an email attachment."
    ],
    tools: [
      { tool: "drive_search_files", args: { query: "resume" } },
      { tool: "drive_download_file", args: { fileId: "<from previous step>" } },
      { tool: "gmail_send_email", args: { to: ["vkarmaritesh@gmail.com"], subject: "Resume", body: "Please find attached.", attachmentArtifactIds: ["<from previous step>"] } }
    ]
  },
  // Add more example tasks as you build more tools
];
