const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

type ApiMethod = "GET" | "POST";

const request = async (
  path: string,
  method: ApiMethod,
  body?: unknown,
  token?: string
) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;

  if (!response.ok) {
    const message =
      (typeof payload.message === "string" && payload.message) ||
      (typeof payload.error === "string" && payload.error) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
};

export const api = {
  register: (input: { name: string; email: string; password: string }) =>
    request("/auth/create", "POST", input),
  login: (input: { email: string; password: string }) =>
    request("/auth/login", "POST", input),
  getOAuthUrl: (
    provider: "gmail" | "calendar" | "docs" | "sheets" | "drive" | "slack" | "notion",
    token: string
  ) => request(`/tool/${provider}/oauth`, "GET", undefined, token),
  getOAuthConnections: (token: string) =>
    request("/tool/oauth-tokens", "GET", undefined, token),
  
  // Chat & Conversation APIs
  getConversations: (token: string) =>
    request("/conversations", "GET", undefined, token),
  getConversation: (conversationId: string, token: string) =>
    request(`/conversations/${conversationId}`, "GET", undefined, token),
  getConversationMessages: (conversationId: string, token: string, limit: number = 1000, offset: number = 0) =>
    request(`/conversations/${conversationId}/messages?limit=${limit}&offset=${offset}`, "GET", undefined, token),
  queryAgent: (
    prompt: string,
    token: string,
    conversationId?: string,
    maxSteps?: number,
    includeTrace?: boolean
  ) =>
    request("/agent/query", "POST", {
      prompt,
      conversationId,
      maxSteps,
      includeTrace,
    }, token),
  
  // Streaming agent query with token-by-token streaming
  queryAgentStream: (
    prompt: string,
    token: string,
    conversationId?: string,
    onToken?: (token: string) => void,
    onComplete?: (data: any) => void,
    onError?: (error: string) => void
  ) => {
    return {
      send: async () => {
        return fetch(`${API_BASE_URL}/agent/query-stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            prompt,
            conversationId,
          }),
        }).then(async response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          
          if (!reader) return;
          
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines[lines.length - 1];
              
              for (let i = 0; i < lines.length - 1; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                if (line.startsWith("event: ")) {
                  const eventType = line.slice(7);
                  if (eventType === "complete") {
                    const dataLine = lines[i + 1]?.trim();
                    if (dataLine?.startsWith("data: ")) {
                      const data = JSON.parse(dataLine.slice(6));
                      onComplete?.(data);
                    }
                  } else if (eventType === "error") {
                    const dataLine = lines[i + 1]?.trim();
                    if (dataLine?.startsWith("data: ")) {
                      const data = JSON.parse(dataLine.slice(6));
                      onError?.(data.error || "Unknown error");
                    }
                  }
                } else if (line.startsWith("data: ")) {
                  try {
                    const data = JSON.parse(line.slice(6));
                    if (data.token) {
                      onToken?.(data.token);
                    }
                  } catch (e) {
                    // Ignore parse errors for incomplete JSON
                  }
                }
              }
            }
          } finally {
            reader.cancel();
          }
        });
      }
    };
  },

  // WhatsApp APIs
  getWhatsappConnect: (token: string) =>
    request("/tool/whatsapp/connect", "GET", undefined, token),
  getWhatsappStatus: (token: string) =>
    request("/tool/whatsapp/status", "GET", undefined, token),
  sendWhatsappMessage: (token: string, phoneNumber: string, message: string) =>
    request("/tool/whatsapp/send", "POST", { phoneNumber, message }, token),
  getWhatsappChats: (token: string) =>
    request("/tool/whatsapp/chats", "GET", undefined, token),
  disconnectWhatsapp: (token: string) =>
    request("/tool/whatsapp/disconnect", "POST", {}, token),
};
