// app/api/chat/route.ts  ← THE MAIN ROUTE — SSE streaming
import { NextRequest } from "next/server";
import { prisma } from "../config/prisma";
import { requireAuth } from "@/lib/auth";
import { runAgentLoop, generateTitle } from "../lib/agent";

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    userId = await requireAuth(req);
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }

  const { conversationId, message } = await req.json();

  if (!conversationId || !message) {
    return new Response("Missing conversationId or message", { status: 400 });
  }

  // verify conversation belongs to user
  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId },
  });
  if (!conversation) {
    return new Response("Conversation not found", { status: 404 });
  }

  // ── SSE stream setup ──────────────────────────────────────────────────────
  const encoder = new TextEncoder();
  const stream  = new ReadableStream({
    async start(controller) {

      function send(event: string, data: any) {
        const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(payload));
      }

      try {
        await runAgentLoop({
          conversationId,
          userId,
          userMessage: message,

          // stream final response character by character
          onToken: (token) => {
            send("token", { token });
          },

          // tell frontend a tool is starting
          onToolCall: (name, args) => {
            send("tool_call", { name, args });
          },

          // tell frontend tool finished with result
          onToolResult: (name, result) => {
            send("tool_result", {
              name,
              success: result.success,
              // only send safe summary — never raw base64 to frontend
              summary: buildToolSummary(name, result),
            });
          },
        });

        // auto-generate title on first message
        if (!conversation.title || conversation.title === "New conversation") {
          const title = await generateTitle(message);
          await prisma.conversation.update({
            where: { id: conversationId },
            data:  { title },
          });
          send("title", { title });
        }

        send("done", { status: "complete" });

      } catch (e: any) {
        send("error", { error: e.message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection":    "keep-alive",
    },
  });
}

// ── build a clean summary of tool result for frontend ─────────────────────────
function buildToolSummary(name: string, result: any): string {
  if (!result.success) return result.error ?? "Failed";

  const d = result.data;
  switch (name) {
    case "gdrive_search_files":
      return `Found ${d.files?.length ?? 0} files`;
    case "gdrive_download_file":
      return `Downloaded ${d.name} (${Math.round((d.sizeBytes ?? 0) / 1024)}KB)`;
    case "gdrive_share_file":
      return `Shared: ${d.name}`;
    case "gmail_send_email":
      return `Email sent (ID: ${d.messageId})`;
    case "gmail_list_emails":
      return `Found ${d.emails?.length ?? 0} emails`;
    case "gmail_get_email":
      return `Read email: ${d.subject}`;
    case "gmail_search_emails":
      return `Found ${d.emails?.length ?? 0} emails`;
    case "gmail_download_attachment":
      return `Downloaded attachment: ${d.filename}`;
    default:
      return "Done";
  }
}