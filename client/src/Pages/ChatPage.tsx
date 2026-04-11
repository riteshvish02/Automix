import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import {
  IconNewChat,
  IconSend,
  IconLogout,
  IconBack,
  IconSpinner,
  IconChat,
} from "../components/chat/ChatIcons";

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

const AssistantMessage = ({ content }: { content: string }) => (
  <div className="whitespace-pre-wrap text-[15px] leading-[1.75] text-neutral-200">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={{
        a: (props: any) => (
          <a
            {...props}
            className="text-neutral-400 underline decoration-neutral-600 underline-offset-2 hover:text-neutral-200 transition-colors"
            target="_blank"
            rel="noreferrer"
          />
        ),
        p: (props: any) => <p {...props} className="mb-3 last:mb-0 text-[16px]" />,
        ul: (props: any) => <ul {...props} className="mb-3 list-disc pl-5 space-y-1" />,
        ol: (props: any) => <ol {...props} className="mb-3 list-decimal pl-5 space-y-1" />,
        li: (props: any) => <li {...props} className="text-neutral-300" />,
        code: ({ inline, children, ...props }: any) => {
          if (inline) {
            return (
              <code
                {...props}
                className="rounded bg-neutral-800/80 px-1.5 py-0.5 text-xs font-mono text-neutral-300"
              >
                {children}
              </code>
            );
          }
          return (
            <code
              {...props}
              className="block overflow-x-auto rounded-lg bg-neutral-800/80 p-4 text-xs font-mono text-neutral-300 border border-neutral-700/50"
            >
              {children}
            </code>
          );
        },
        pre: (props: any) => <pre {...props} className="mb-3" />,
        h1: (props: any) => <h1 {...props} className="text-lg font-semibold text-neutral-100 mb-3 mt-4 first:mt-0" />,
        h2: (props: any) => <h2 {...props} className="text-base font-semibold text-neutral-100 mb-2 mt-3 first:mt-0" />,
        h3: (props: any) => <h3 {...props} className="text-sm font-semibold text-neutral-200 mb-2 mt-3 first:mt-0" />,
        blockquote: (props: any) => <blockquote {...props} className="border-l-2 border-neutral-600 pl-4 text-neutral-400 italic my-3" />,
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

/* ── Sidebar menu item ── */
const SidebarItem = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[14px] text-neutral-300 hover:text-neutral-300 hover:bg-neutral-800/50 transition-all duration-150"
  >
    <span className="text-neutral-300 group-hover:text-neutral-400 transition-colors">{icon}</span>
    {label}
  </button>
);

export const ChatPage = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [sidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  // Fetch conversations on mount
  useEffect(() => {
    if (!token) return;
    const fetchConversations = async () => {
      try {
        setConversationsLoading(true);
        const response = (await api.getConversations(token)) as Record<string, unknown>;
        const data = (response.data || {}) as Record<string, unknown>;
        const convs = Array.isArray(data.conversations) ? (data.conversations as Conversation[]) : [];
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
        const response = (await api.getConversationMessages(currentConversation.id, token, 1000)) as Record<string, unknown>;
        const data = (response.data || {}) as Record<string, unknown>;
        const msgs = Array.isArray(data.messages) ? (data.messages as Message[]) : [];
        setMessages(
          visibleMessages(msgs).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        );
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };
    fetchMessages();
  }, [currentConversation, token]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectConversation = async (conversation: Conversation) => {
    setCurrentConversation(conversation);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !token) return;

    if (!currentConversation) {
      setLoading(true);
      const userPrompt = input;
      setInput("");
      try {
        await api.queryAgent(userPrompt, token, undefined);
        const convResponse = (await api.getConversations(token)) as Record<string, unknown>;
        const convData = (convResponse.data || {}) as Record<string, unknown>;
        const convs = Array.isArray(convData.conversations) ? (convData.conversations as Conversation[]) : [];
        setConversations(convs);
        if (convs.length > 0) {
          setCurrentConversation(convs[0]);
          const msgResponse = (await api.getConversationMessages(convs[0].id, token, 1000)) as Record<string, unknown>;
          const msgData = (msgResponse.data || {}) as Record<string, unknown>;
          const msgs = Array.isArray(msgData.messages) ? (msgData.messages as Message[]) : [];
          setMessages(
            visibleMessages(msgs).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          );
          toast.success("Conversation started!");
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to start conversation");
      } finally {
        setLoading(false);
      }
      return;
    }

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
      await api.queryAgent(currentInput, token, currentConversation.id);
      const msgResponse = (await api.getConversationMessages(currentConversation.id, token, 1000)) as Record<string, unknown>;
      const msgData = (msgResponse.data || {}) as Record<string, unknown>;
      const updatedMsgs = Array.isArray(msgData.messages) ? (msgData.messages as Message[]) : [];
      setMessages(
        visibleMessages(updatedMsgs).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
      if (token) {
        const convResponse = (await api.getConversations(token)) as Record<string, unknown>;
        const convData = (convResponse.data || {}) as Record<string, unknown>;
        const convs = Array.isArray(convData.conversations) ? (convData.conversations as Conversation[]) : [];
        setConversations(convs);
      }
      toast.success("Message processed successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!token) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#181818] text-neutral-400">
        <IconSpinner className="w-5 h-5 mr-3" />
        <span className="text-sm">Redirecting to login...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#181818] text-neutral-200 font-sans">
      {/* ── Sidebar ── */}
      <aside
        className={`${
          sidebarOpen ? "w-[260px]" : "w-0"
        } bg-[#181818] border-r border-neutral-800/60 flex flex-col overflow-hidden transition-all duration-200 flex-shrink-0`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Brand */}
          <div className="flex items-center justify-between mb-8 px-1">
            <h1 className="text-base font-semibold tracking-tight text-neutral-100">use.ai</h1>
          </div>

          {/* New Chat */}
          <button
            onClick={() => {
              setCurrentConversation(null);
              setMessages([]);
            }}
            className="flex items-center gap-2.5 w-full px-3 py-3 mb-6 rounded-lg text-[14px] font-medium text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/40 transition-all duration-150"
          >
            <IconNewChat className="w-4 h-4" />
            New conversation
          </button>

          {/* Nav */}
          

          {/* Conversations */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <p className="text-[12px] font-medium uppercase tracking-wider text-neutral-300 mb-2 px-3">
              Recent
            </p>

            {conversationsLoading ? (
              <div className="flex items-center justify-center py-8">
                <IconSpinner className="w-4 h-4 text-neutral-300" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-[12px] text-neutral-400 text-center py-8 px-4">
                No conversations yet
              </div>
            ) : (
              <div className="flex flex-col gap-0.5 overflow-y-auto scrollbar-thin pr-1">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => selectConversation(conv)}
                    className={`group flex items-center gap-2.5 px-3 py-2 text-left rounded-lg transition-all duration-150 ${
                      currentConversation?.id === conv.id
                        ? "bg-neutral-800/70 text-neutral-100"
                        : "text-neutral-300 hover:text-neutral-300 hover:bg-neutral-800/30"
                    }`}
                  >
                    <IconChat className="w-4 h-4 flex-shrink-0 opacity-40" />
                    <span className="truncate text-[14px]">
                      {conv.firstMessage || conv.title || conv.summary || "Conversation"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-800/60 pt-3 mt-3 space-y-0.5">
            <SidebarItem
              icon={<IconBack className="w-4 h-4" />}
              label="Dashboard"
              onClick={() => navigate("/")}
            />
            <SidebarItem
              icon={<IconLogout className="w-4 h-4" />}
              label="Log out"
              onClick={logout}
            />
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex flex-1 flex-col min-w-0">
        {/* Header */}
       

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-[#212121]">
          {messages.length === 0 && !loading ? (
            <div className="flex h-full flex-col items-center justify-center px-6">
              <div className="text-neutral-700 mb-4">
                <IconChat className="w-10 h-10" />
              </div>
              <p className="text-neutral-500 text-base">Start a new conversation</p>
              <p className="text-neutral-600 text-sm mt-1.5">Type a message below to begin</p>
            </div>
          ) : (
            <div className="max-w-[720px] w-full mx-auto px-6 py-8 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" ? (
                    <div className="flex gap-3 max-w-[90%]">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                      </div>
                      <div className="pt-0.5 bg-[#303030] px-4 py-2.5 rounded-2xl rounded-tl-md">
                        <AssistantMessage content={msg.content} />
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[75%] bg-[#181818] border border-neutral-700/30 rounded-2xl rounded-br-md px-4 py-2.5">
                      <p className="whitespace-pre-wrap text-[16px] leading-[1.65] text-neutral-100">
                        {msg.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 pt-2">
                    <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── Input area ── */}
        <div className="border-t border-neutral-800/60 bg-[#212121] px-6 py-8">
          <form
            onSubmit={handleSendMessage}
            className="max-w-[620px] mx-auto"
          >
            <div className="relative flex items-end bg-[#181818] border border-neutral-800 rounded-3xl focus-within:border-neutral-700 transition-colors py-6 px-4">
              {/* Attach button */}
              

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Type your message here..."
                rows={1}
                className="flex-1 bg-transparent text-[15px] text-neutral-100 placeholder-neutral-300 py-3.5 pr-2 outline-none resize-none max-h-[160px] leading-[1.5] disabled:opacity-50 ml-3"
              />

              {/* Send button */}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex-shrink-0 p-3 text-neutral-300 hover:text-neutral-300 transition-colors disabled:opacity-30 disabled:hover:text-neutral-300"
              >
                {loading ? (
                  <IconSpinner className="w-5 h-5" />
                ) : (
                  <IconSend className="w-5 h-5" />
                )}
              </button>
            </div>

            <p className="text-xs text-neutral-600 text-center mt-2.5">
              Press Enter to send · Shift+Enter for new line
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};
