// lib/tools/registry.ts
import { gdriveTools } from "./googleDrive.tool";
import { gmailTools } from "./gmail.tool";
import { ToolDefinition } from "./types";
import { prisma } from "../src/config/prisma";

// ── flat map: "gdrive_search_files" → ToolDefinition ─────────────────────────
const REGISTRY: Record<string, ToolDefinition> = {};

for (const tool of [...gdriveTools, ...gmailTools]) {
  REGISTRY[tool.schema.function.name] = tool;
}

// ── 1. getToolSchemas ─────────────────────────────────────────────────────────
// Called once at the start of every agent loop.
// Returns the schema array that goes directly into openai call.
// Automatically filters to only tools the user has authenticated.
export async function getToolSchemas(userId: string) {
  // fetch which providers this user has OAuth tokens for
  const tokens = await prisma.oAuthToken.findMany({
    where: { userId },
    select: { provider: true },
  });

  const authenticatedProviders = new Set(tokens.map((t) => t.provider));
  // e.g. Set { "gdrive", "gmail" }

  return Object.values(REGISTRY)
    .filter((tool) => {
      // tools with provider: null need no auth (web search etc.) — always include
      if (!tool.provider) return true;
      // only include if user has a token for this provider
      return authenticatedProviders.has(tool.provider);
    })
    .map((tool) => tool.schema);
  // returns array of OpenAI tool schema objects — pass directly to ChatGPT
}

// ── 2. executeTool ────────────────────────────────────────────────────────────
// Called inside agent loop whenever ChatGPT returns a tool_call.
// Fetches the right OAuth token, runs execute(), returns JSON string.
export async function executeTool(
  name: string,
  args: any,
  userId: string
): Promise<string> {
  // look up tool in registry
  const tool = REGISTRY[name];
  if (!tool) {
    return JSON.stringify({ success: false, error: `Unknown tool: ${name}` });
  }

  // fetch OAuth token for this tool's provider
  let accessToken: string | null = null;
  if (tool.provider) {
    const token = await prisma.oAuthToken.findUnique({
      where: {
        userId_provider: { userId, provider: tool.provider },
      },
    });

    if (!token) {
      return JSON.stringify({
        success: false,
        error: `User has not connected ${tool.provider}. Ask them to authenticate first.`,
      });
    }

    // check if token is expired — if so, try to refresh
    if (token.expiresAt && token.expiresAt < new Date()) {
      const refreshed = await refreshToken(userId, tool.provider, token.refreshToken);
      if (!refreshed) {
        return JSON.stringify({
          success: false,
          error: `${tool.provider} token expired and refresh failed. Ask user to re-authenticate.`,
        });
      }
      accessToken = refreshed;
    } else {
      accessToken = token.accessToken;
    }
  }

  // run the tool
  try {
    const result = await tool.execute(args, accessToken);
    return JSON.stringify(result);
    // ChatGPT receives this string as the tool result
    // it reads it, reasons about it, decides next action
  } catch (e: any) {
    return JSON.stringify({ success: false, error: e.message });
  }
}

// ── 3. refreshToken ───────────────────────────────────────────────────────────
// Tries to refresh an expired OAuth token.
// Returns new accessToken string on success, null on failure.
async function refreshToken(
  userId: string,
  provider: string,
  refreshToken: string | null
): Promise<string | null> {
  if (!refreshToken) return null;

  try {
    let newAccessToken: string;
    let newExpiresAt: Date;

    if (provider === "gdrive" || provider === "gmail") {
      // both use Google OAuth
      const { google } = await import("googleapis");
      const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );
      auth.setCredentials({ refresh_token: refreshToken });
      const { credentials } = await auth.refreshAccessToken();

      if (!credentials.access_token) return null;
      newAccessToken = credentials.access_token;
      newExpiresAt   = new Date(credentials.expiry_date ?? Date.now() + 3600 * 1000);
    } else {
      // add other providers here (notion, slack etc.)
      return null;
    }

    // save new token to DB
    await prisma.oAuthToken.update({
      where: { userId_provider: { userId, provider } },
      data: {
        accessToken: newAccessToken,
        expiresAt:   newExpiresAt,
      },
    });

    return newAccessToken;
  } catch {
    return null;
  }
}

// ── 4. getRegisteredTools ─────────────────────────────────────────────────────
// Utility — returns all tool names and their providers.
// Useful for showing user which integrations are available.
export function getRegisteredTools() {
  return Object.values(REGISTRY).map((tool) => ({
    name:        tool.schema.function.name,
    description: tool.schema.function.description,
    provider:    tool.provider,
  }));
}