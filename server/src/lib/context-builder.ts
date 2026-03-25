// lib/context-builder.ts
import { prisma } from "../config/prisma";
import { getRegisteredTools } from "../tools/registry";

export async function buildSystemPrompt(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  });

  // which providers has this user connected
  const tokens = await prisma.oAuthToken.findMany({
    where: { userId },
    select: { provider: true, expiresAt: true },
  });
  const connectedProviders = new Set(tokens.map((t) => t.provider));

  // build tool access table like Slashy does
  const allTools = getRegisteredTools();
  const toolRows = allTools
    .map((t) => {
      const provider    = t.provider ?? "none";
      const connected   = !t.provider || connectedProviders.has(t.provider);
      return `| ${t.name} | ${connected ? "available" : "not connected"} |`;
    })
    .join("\n");

  const now = new Date().toLocaleString("en-IN", {
    timeZone:     "Asia/Kolkata",
    dateStyle:    "full",
    timeStyle:    "short",
  });

  return `
You are a highly capable AI assistant with access to the user's apps and tools.
You can take real actions — search files, send emails, read emails, manage calendar — on behalf of the user.

<user>
  Name:  ${user?.name}
  Email: ${user?.email}
  Time:  ${now} (IST)
</user>

<tools>
| Tool | Status |
|------|--------|
${toolRows}
</tools>

<instructions>
- Always use tools to complete tasks — do not just describe what you would do.
- When a task needs multiple steps (e.g. find file → download → send email), chain the tool calls automatically.
- If a tool returns an error, try an alternative approach before giving up.
- After completing a task, give a concise confirmation of what was done.
- Never expose raw base64 data or internal IDs in your response to the user.
- If a required provider is not connected, tell the user to connect it from settings.
</instructions>
`.trim();
}