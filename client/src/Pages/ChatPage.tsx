import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { Send, Plus, Menu, X, ArrowLeft, Loader, LogOut } from "lucide-react";

interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | "tool";
  content: string;
  createdAt: string;
  toolName?: string;
}

const visibleMessages = (items: Message[]) =>
  items.filter((message) => message.role === "user" || message.role === "assistant");

interface Conversation {
  id: string;
  userId: string;
  summary?: string;
  firstMessage?: string | null;
  title?: string;
  createdAt: string;
  updatedAt: string;
  messageCount?: number;
}

const AssistantMessage = ({ content }: { content: string }) => {
  return (
    <div className="text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: (props: any) => (
            <a
              {...props}
              className="text-cyan-300 underline decoration-cyan-500/60 underline-offset-2 hover:text-cyan-200"
              target="_blank"
              rel="noreferrer"
            />
          ),
          p: (props: any) => <p {...props} className="mb-2 last:mb-0" />,
          ul: (props: any) => <ul {...props} className="mb-2 list-disc pl-5" />,
          ol: (props: any) => <ol {...props} className="mb-2 list-decimal pl-5" />,
          li: (props: any) => <li {...props} className="mb-1" />,
          code: ({ inline, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  {...props}
                  className="rounded bg-slate-900 px-1 py-0.5 text-xs text-cyan-200"
                >
                  {children}
                </code>
              );
            }

            return (
              <code
                {...props}
                className="block overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100"
              >
                {children}
              </code>
            );
          },
          pre: (props: any) => <pre {...props} className="mb-2" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export const ChatPage = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations on mount
  useEffect(() => {
    if (!token) return;

    const fetchConversations = async () => {
      try {
        setConversationsLoading(true);
        const response = (await api.getConversations(token)) as Record<
          string,
          unknown
        >;
        const data = (response.data || {}) as Record<string, unknown>;
        const convs = Array.isArray(data.conversations)
          ? (data.conversations as Conversation[])
          : [];
        setConversations(convs);

        if (convs.length > 0) {
          await selectConversation(convs[0]);
        }
      } catch (error) {
        console.error("Failed to load conversations:", error);
      } finally {
        setConversationsLoading(false);
      }
    };

    fetchConversations();
  }, [token]);

  // Fetch messages for current conversation
  useEffect(() => {
    if (!token || !currentConversation) return;

    const fetchMessages = async () => {
      try {
        const response = (await api.getConversationMessages(
          currentConversation.id,
          token
        )) as Record<string, unknown>;
        const data = (response.data || {}) as Record<string, unknown>;
        const msgs = Array.isArray(data.messages) ? (data.messages as Message[]) : [];
        setMessages(
          visibleMessages(msgs).sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();
  }, [currentConversation, token]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectConversation = async (conversation: Conversation) => {
    setCurrentConversation(conversation);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || !token) {
      return;
    }

    // If no conversation exists, create one first
    if (!currentConversation) {
      setLoading(true);
      const userPrompt = input;
      setInput("");

      try {
        await api.queryAgent(
          userPrompt,
          token,
          undefined
        );

        // Fetch updated conversations
        const convResponse = (await api.getConversations(token)) as Record<
          string,
          unknown
        >;
        const convData = (convResponse.data || {}) as Record<string, unknown>;
        const convs = Array.isArray(convData.conversations)
          ? (convData.conversations as Conversation[])
          : [];
        setConversations(convs);

        // Select the first (newest) conversation
        if (convs.length > 0) {
          setCurrentConversation(convs[0]);

          // Load messages
          const msgResponse = (await api.getConversationMessages(
            convs[0].id,
            token
          )) as Record<string, unknown>;
          const msgData = (msgResponse.data || {}) as Record<string, unknown>;
          const msgs = Array.isArray(msgData.messages)
            ? (msgData.messages as Message[])
            : [];
          setMessages(
            visibleMessages(msgs).sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
          );

          toast.success("Conversation started!");
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to start conversation"
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    // Add user message immediately
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      conversationId: currentConversation.id,
      role: "user",
      content: input,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      await api.queryAgent(
        currentInput,
        token,
        currentConversation.id
      );

      // Fetch updated messages from server
      const msgResponse = (await api.getConversationMessages(
        currentConversation.id,
        token
      )) as Record<string, unknown>;
      const msgData = (msgResponse.data || {}) as Record<string, unknown>;
      const updatedMsgs = Array.isArray(msgData.messages)
        ? (msgData.messages as Message[])
        : [];

      setMessages(
        visibleMessages(updatedMsgs).sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      );

      // Refresh conversations
      if (token) {
        const convResponse = (await api.getConversations(token)) as Record<
          string,
          unknown
        >;
        const convData = (convResponse.data || {}) as Record<string, unknown>;
        const convs = Array.isArray(convData.conversations)
          ? (convData.conversations as Conversation[])
          : [];
        setConversations(convs);
      }

      toast.success("Message processed successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
      // Remove the user message on error
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-slate-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed right-4 top-4 z-50 rounded-lg bg-slate-900/80 backdrop-blur p-2 md:hidden border border-slate-800/50"
      >
        {sidebarOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-900/50 bg-slate-950 p-4 transition-transform duration-300 md:relative md:translate-x-0 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">
            SlashyAI
          </h1>
          <p className="text-xs text-slate-500 mt-1">Chat Interface</p>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => {
            setCurrentConversation(null);
            setMessages([]);
            setSidebarOpen(false);
          }}
          className="w-full mb-6 flex items-center justify-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 px-4 py-2.5 text-sm font-medium text-white transition duration-200"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </button>

        {/* Conversations List */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
            Conversations
          </p>

          {conversationsLoading ? (
            <div className="text-xs text-slate-600 text-center py-4">Loading...</div>
          ) : conversations.length === 0 ? (
            <div className="text-xs text-slate-600 text-center py-8">No conversations yet</div>
          ) : (
            <div className="flex flex-col gap-1 overflow-y-auto pr-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    selectConversation(conv);
                    setSidebarOpen(false);
                  }}
                  className={`rounded-md px-3 py-2 text-left text-sm transition duration-200 ${
                    currentConversation?.id === conv.id
                      ? "bg-slate-800 text-slate-100"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`}
                >
                  <p className="truncate text-sm">
                    {conv.firstMessage || conv.title || conv.summary || "New conversation"}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {formatTime(conv.updatedAt)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="mt-6 pt-4 border-t border-slate-900/50 flex flex-col gap-2">
          <button
            onClick={() => {
              navigate("/");
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2 rounded-md bg-slate-900/50 hover:bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-400 transition duration-200"
          >
            ← Dashboard
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 rounded-md bg-slate-900/50 hover:bg-red-900/20 px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-red-400 transition duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex w-full flex-col bg-black">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
          {messages.length === 0 && !loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-slate-200 mb-2">Welcome to SlashyAI</h1>
                <p className="text-slate-500 max-w-md text-sm">
                  Start a new conversation. Your chat history will be saved.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } gap-3`}
                >
                  <div
                    className={`max-w-2xl rounded-lg px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-cyan-600 text-white rounded-br-none"
                        : "bg-slate-900 text-slate-100 rounded-bl-none border border-slate-800/50"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <AssistantMessage content={msg.content} />
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {msg.content}
                      </p>
                    )}
                    <p className={`mt-2 text-xs ${
                      msg.role === "user" ? "text-cyan-100/60" : "text-slate-500"
                    }`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex justify-start gap-3">
                  <div className="rounded-lg bg-slate-900 border border-slate-800/50 px-4 py-3 flex items-center gap-2 text-slate-400">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                    <span className="text-sm text-slate-300">Analyzing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-slate-900/50 bg-black p-6 md:p-8">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask anything..."
              className="flex-1 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 transition focus:border-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 px-4 py-3 font-medium text-white transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-700"
            >
              {loading ? (
                <div className="flex gap-1">
                  <div className="h-3 w-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                </div>
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
