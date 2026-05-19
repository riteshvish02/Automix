import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

type ProviderKey = "gmail" | "calendar" | "docs" | "sheets" | "drive" | "slack" | "notion";

type ProviderConnection = {
  connected: boolean;
  isExpired: boolean;
  updatedAt: string | null;
};

const DEFAULT_CONNECTIONS: Record<ProviderKey, ProviderConnection> = {
  gmail: { connected: false, isExpired: false, updatedAt: null },
  calendar: { connected: false, isExpired: false, updatedAt: null },
  docs: { connected: false, isExpired: false, updatedAt: null },
  sheets: { connected: false, isExpired: false, updatedAt: null },
  drive: { connected: false, isExpired: false, updatedAt: null },
  slack: { connected: false, isExpired: false, updatedAt: null },
  notion: { connected: false, isExpired: false, updatedAt: null },
};

const PROVIDERS: Array<{
  key: ProviderKey;
  label: string;
  description: string;
  logo: string;
}> = [
  { key: "gmail", label: "Gmail", description: "Send and search emails", logo: "/gmail.png" },
  { key: "calendar", label: "Calendar", description: "Create and manage events", logo: "/calendar.png" },
  { key: "docs", label: "Docs", description: "Create and edit documents", logo: "/docs.png" },
  { key: "sheets", label: "Sheets", description: "Store tabular workflow data", logo: "/sheets.png" },
  { key: "drive", label: "Drive", description: "Search and upload files", logo: "/drive.png" },
  { key: "slack", label: "Slack", description: "Send messages to your workspace", logo: "/slack.png" },
  { key: "notion", label: "Notion", description: "Connect pages and databases", logo: "/Notion_logo_PNG_(2).png" },
];

const Spinner = ({ className = "" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ToolConnectPanel = () => {
  const { token, user } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<ProviderKey | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [connections, setConnections] = useState<Record<ProviderKey, ProviderConnection>>(DEFAULT_CONNECTIONS);

  const connectedCount = useMemo(
    () => Object.values(connections).filter((c) => c.connected).length,
    [connections]
  );

  const fetchConnections = async (silent = false) => {
    if (!token) return;
    if (!silent) setRefreshing(true);

    try {
      const response = (await api.getOAuthConnections(token)) as Record<string, unknown>;
      const data = (response.data || {}) as Record<string, unknown>;
      const providers = Array.isArray(data.providers)
        ? (data.providers as Array<Record<string, unknown>>)
        : [];

      const nextConnections = { ...DEFAULT_CONNECTIONS };
      for (const provider of providers) {
        const key = provider.key as ProviderKey;
        if (!nextConnections[key]) continue;
        nextConnections[key] = {
          connected: Boolean(provider.connected),
          isExpired: Boolean(provider.isExpired),
          updatedAt: typeof provider.updatedAt === "string" ? provider.updatedAt : null,
        };
      }
      setConnections(nextConnections);
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

    setLoadingProvider(provider);
    try {
      const response = (await api.getOAuthUrl(provider, token)) as Record<string, unknown>;
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-1">
        <div>
          <h2 className="text-lg font-semibold text-white">Integrations</h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            {connectedCount} of {PROVIDERS.length} tools connected
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${refreshing ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
          <span className="text-xs text-neutral-500">{refreshing ? "Syncing…" : "Live"}</span>
        </div>
      </div>

      {/* Tool list */}
      <div className="space-y-2">
        {PROVIDERS.map((provider) => {
          const connection = connections[provider.key];
          const isConnected = connection?.connected;
          const isExpired = connection?.isExpired;
          const isLoading = loadingProvider === provider.key;

          return (
            <div
              key={provider.key}
              className={`flex items-center gap-4 rounded-xl border px-5 py-4 transition-all duration-150 ${
                isConnected && !isExpired
                  ? "border-neutral-700/50 bg-[#1c1c1c]"
                  : "border-neutral-800/50 bg-[#161616] hover:bg-[#1c1c1c] hover:border-neutral-700/50"
              }`}
            >
              {/* Logo */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-800/60 flex items-center justify-center overflow-hidden">
                <img
                  src={provider.logo}
                  alt={provider.label}
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-neutral-100">{provider.label}</h3>
                  {isConnected && !isExpired && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Connected
                    </span>
                  )}
                  {isExpired && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Expired
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{provider.description}</p>
              </div>

              {/* Action button */}
              <button
                type="button"
                onClick={() => connectProvider(provider.key)}
                disabled={loadingProvider !== null}
                className={`flex-shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${
                  isConnected && !isExpired
                    ? "bg-transparent border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500"
                    : "bg-white text-black hover:bg-neutral-200"
                }`}
              >
                {isLoading ? (
                  <>
                    <Spinner className="w-3.5 h-3.5" />
                    <span>Connecting…</span>
                  </>
                ) : isConnected && !isExpired ? (
                  "Reconnect"
                ) : isExpired ? (
                  "Reconnect"
                ) : (
                  "Connect"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Signed in footer */}
      <div className="mt-8 flex items-center gap-3 px-1 pt-6 border-t border-neutral-800/50">
        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-xs font-medium text-neutral-300 uppercase">
          {(user?.name?.[0] || user?.email?.[0] || "U")}
        </div>
        <div>
          <p className="text-sm text-neutral-300">{user?.name || user?.email || "Unknown user"}</p>
          <p className="text-[11px] text-neutral-600">Signed in</p>
        </div>
      </div>
    </div>
  );
};
