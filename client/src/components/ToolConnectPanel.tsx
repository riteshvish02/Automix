import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { WhatsAppQRModal } from "./WhatsAppQRModal";

type ProviderKey = "gmail" | "calendar" | "docs" | "sheets" | "drive" | "slack" | "notion" | "whatsapp";

type ProviderConnection = {
  connected: boolean;
  isExpired: boolean;
  updatedAt: string | null;
};

const DEFAULT_CONNECTIONS: Record<Exclude<ProviderKey, "whatsapp">, ProviderConnection> = {
  gmail: { connected: false, isExpired: false, updatedAt: null },
  calendar: { connected: false, isExpired: false, updatedAt: null },
  docs: { connected: false, isExpired: false, updatedAt: null },
  sheets: { connected: false, isExpired: false, updatedAt: null },
  drive: { connected: false, isExpired: false, updatedAt: null },
  slack: { connected: false, isExpired: false, updatedAt: null },
  notion: { connected: false, isExpired: false, updatedAt: null },
};

/* ── Tool Icons with Actual Brand Logos ── */
const ToolIcons: Record<ProviderKey, React.ReactNode> = {
  gmail: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M21 4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#EA4335" />
      <path d="M3 6l9 7 9-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" fill="#4285F4" />
      <path d="M13 2v7h7M8 15h8M8 19h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  sheets: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#34A853" />
      <line x1="2" y1="8" x2="22" y2="8" stroke="white" strokeWidth="1.5" />
      <line x1="2" y1="14" x2="22" y2="14" stroke="white" strokeWidth="1.5" />
      <line x1="8" y1="2" x2="8" y2="22" stroke="white" strokeWidth="1.5" />
      <line x1="14" y1="2" x2="14" y2="22" stroke="white" strokeWidth="1.5" />
    </svg>
  ),
  drive: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M12 2l7.5 13H4.5L12 2z" fill="#FBBC04" strokeWidth="0" />
      <path d="M4.5 15h15l-7.5 5-7.5-5z" fill="#34A853" strokeWidth="0" />
      <path d="M9 8.5L4.5 15h9l-4.5-6.5z" fill="#EA4335" strokeWidth="0" />
    </svg>
  ),
  slack: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <g>
        <path d="M5 2c-1.66 0-3 1.34-3 3 0 1.66 1.34 3 3 3h3V5c0-1.66-1.34-3-3-3z" fill="#E01E5A" />
        <path d="M5 8c-1.66 0-3 1.34-3 3 0 1.66 1.34 3 3 3h3v-6H5z" fill="#E01E5A" />
        <path d="M8 14c0-1.66-1.34-3-3-3H2c0 1.66 1.34 3 3 3h3z" fill="#36C5F0" />
        <path d="M14 14c0-1.66-1.34-3-3-3h-3v6h3c1.66 0 3-1.34 3-3z" fill="#2EB67D" />
        <path d="M19 14c-1.66 0-3 1.34-3 3 0 1.66 1.34 3 3 3h3c0-1.66-1.34-3-3-3h-3z" fill="#ECB22E" />
        <path d="M19 8c-1.66 0-3 1.34-3 3v3h6v-3c0-1.66-1.34-3-3-3z" fill="#36C5F0" />
      </g>
    </svg>
  ),
  notion: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M3 4c0-1.1.9-2 2-2h14l4 4v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4z" fill="white" />
      <path d="M7 8h10M7 12h8M7 16h6" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M17.5 2h-11C4.57 2 3 3.57 3 5.5v13C3 20.43 4.57 22 6.5 22h11c1.93 0 3.5-1.57 3.5-3.5v-13C21 3.57 19.43 2 17.5 2zm0 15h-11v-13h11v13z" fill="#25D366" />
      <path d="M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="white" strokeWidth="1" fill="white" />
    </svg>
  ),
};

const PROVIDERS: Array<{
  key: Exclude<ProviderKey, "whatsapp">;
  label: string;
  description: string;
}> = [
  { key: "gmail", label: "Gmail", description: "Send and search emails" },
  { key: "calendar", label: "Calendar", description: "Create and manage events" },
  { key: "docs", label: "Docs", description: "Create and edit documents" },
  { key: "sheets", label: "Sheets", description: "Store tabular workflow data" },
  { key: "drive", label: "Drive", description: "Search and upload files" },
  { key: "slack", label: "Slack", description: "Send messages to your workspace" },
  { key: "notion", label: "Notion", description: "Connect pages and databases" },
];

/* ── Spinner matching chat page ── */
const Spinner = ({ className = "" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ToolConnectPanel = () => {
  const { token, user } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<Exclude<ProviderKey, "whatsapp"> | "whatsapp" | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [connections, setConnections] = useState<Record<Exclude<ProviderKey, "whatsapp">, ProviderConnection>>(DEFAULT_CONNECTIONS);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [whatsappQROpen, setWhatsappQROpen] = useState(false);

  const connectedCount = useMemo(
    () => Object.values(connections).filter((c) => c.connected).length+ (whatsappConnected ? 1 : 0),
    [connections, whatsappConnected]
  );

  const totalTools = PROVIDERS.length + 1; // +1 for WhatsApp

  const fetchConnections = async (silent = false) => {
    if (!token) return;
    if (!silent) setRefreshing(true);

    try {
      // Fetch OAuth connections
      const response = (await api.getOAuthConnections(token)) as Record<string, unknown>;
      const data = (response.data || {}) as Record<string, unknown>;
      const providers = Array.isArray(data.providers)
        ? (data.providers as Array<Record<string, unknown>>)
        : [];

      const nextConnections = { ...DEFAULT_CONNECTIONS };
      for (const provider of providers) {
        const key = provider.key as Exclude<ProviderKey, "whatsapp">;
        if (!nextConnections[key]) continue;
        nextConnections[key] = {
          connected: Boolean(provider.connected),
          isExpired: Boolean(provider.isExpired),
          updatedAt: typeof provider.updatedAt === "string" ? provider.updatedAt : null,
        };
      }
      setConnections(nextConnections);

      // Fetch WhatsApp status
      try {
        const waResponse = (await api.getWhatsappStatus(token)) as Record<string, unknown>;
        const waData = (waResponse.data || {}) as Record<string, unknown>;
        setWhatsappConnected(Boolean(waData.isConnected));
      } catch (error) {
        console.error('Failed to fetch WhatsApp status:', error);
        setWhatsappConnected(false);
      }
    } catch (error) {
      if (!silent) toast.error(error instanceof Error ? error.message : "Failed to load tool connections");
    } finally {
      if (!silent) setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    void fetchConnections(false);
    const poll = window.setInterval(() => void fetchConnections(true), 15000);
    return () => window.clearInterval(poll);
  }, [token]);

  const connectProvider = async (provider: ProviderKey) => {
    if (!token) { toast.error("Please log in first."); return; }
    
    // WhatsApp is handled separately via modal, not OAuth
    if (provider === "whatsapp") {
      return;
    }
    
    setLoadingProvider(provider as Exclude<ProviderKey, "whatsapp">);
    try {
      const response = (await api.getOAuthUrl(provider as Exclude<ProviderKey, "whatsapp">, token)) as Record<string, unknown>;
      const data = (response.data || {}) as Record<string, unknown>;
      const url = data.url as string | undefined;
      if (!url) { toast.error(`No OAuth URL returned for ${provider}.`); return; }
      window.location.href = url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Failed to connect ${provider}`);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div>
      {/* Status bar */}
      <div className="flex items-center gap-3 mb-6 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${refreshing ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
          <span className="text-[13px] text-neutral-400">
            {connectedCount}/{totalTools} connected
          </span>
        </div>
      </div>

      {/* Tool grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROVIDERS.map((provider) => {
          const connection = connections[provider.key];
          const isConnected = connection?.connected;
          const isExpired = connection?.isExpired;
          const isLoading = loadingProvider === provider.key;

          return (
            <button
              key={provider.key}
              type="button"
              onClick={() => connectProvider(provider.key)}
              disabled={loadingProvider !== null}
              className={`group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isConnected && !isExpired
                  ? "border-neutral-700/60 bg-[#1e1e1e] hover:border-neutral-600"
                  : "border-neutral-800/60 bg-[#1a1a1a] hover:border-neutral-700 hover:bg-[#1e1e1e]"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  provider.key === "gmail" ? "bg-red-500/15 group-hover:bg-red-500/20" :
                  provider.key === "calendar" ? "bg-blue-500/15 group-hover:bg-blue-500/20" :
                  provider.key === "docs" ? "bg-blue-500/15 group-hover:bg-blue-500/20" :
                  provider.key === "sheets" ? "bg-green-500/15 group-hover:bg-green-500/20" :
                  provider.key === "drive" ? "bg-amber-500/15 group-hover:bg-amber-500/20" :
                  provider.key === "slack" ? "bg-pink-500/15 group-hover:bg-pink-500/20" :
                  "bg-white/10 group-hover:bg-white/15"
                }`}
              >
                {ToolIcons[provider.key]}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-medium text-neutral-100">{provider.label}</h3>
                  {isConnected && !isExpired && (
                    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <p className="text-[13px] text-neutral-500 mt-0.5">{provider.description}</p>
                <div className="mt-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${
                      isConnected && !isExpired
                        ? "text-emerald-400/80"
                        : isExpired
                        ? "text-amber-400/80"
                        : "text-neutral-500"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="w-3 h-3" />
                        Opening...
                      </>
                    ) : isConnected && !isExpired ? (
                      "Connected · Reconnect"
                    ) : isExpired ? (
                      "Expired · Reconnect"
                    ) : (
                      "Connect"
                    )}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <svg
                className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors flex-shrink-0 mt-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          );
        })}

        {/* WhatsApp Tool - Special Case */}
        <button
          type="button"
          onClick={() => setWhatsappQROpen(true)}
          disabled={loadingProvider !== null || !token}
          className={`group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            whatsappConnected
              ? "border-neutral-700/60 bg-[#1e1e1e] hover:border-neutral-600"
              : "border-neutral-800/60 bg-[#1a1a1a] hover:border-neutral-700 hover:bg-[#1e1e1e]"
          }`}
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 bg-green-500/15 group-hover:bg-green-500/20">
            {ToolIcons.whatsapp}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-medium text-neutral-100">WhatsApp</h3>
              {whatsappConnected && (
                <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <p className="text-[13px] text-neutral-500 mt-0.5">Send and receive messages</p>
            <div className="mt-2.5">
              <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${
                whatsappConnected ? "text-emerald-400/80" : "text-neutral-500"
              }`}>
                {whatsappConnected ? "Connected · Scan again" : "Connect"}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <svg
            className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors flex-shrink-0 mt-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* WhatsApp QR Modal */}
      {token && (
        <WhatsAppQRModal
          isOpen={whatsappQROpen}
          onClose={() => {
            setWhatsappQROpen(false);
            void fetchConnections(false);
          }}
          token={token}
        />
      )}

      {/* Signed in */}
      <div className="mt-6 flex items-center gap-3 px-1">
        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/50 flex items-center justify-center">
          <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div>
          <p className="text-[13px] text-neutral-300">{user?.name || user?.email || "Unknown user"}</p>
          <p className="text-[11px] text-neutral-600">Signed in</p>
        </div>
      </div>
    </div>
  );
};
