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

// Provider icon components
const IconGmail = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="currentColor" opacity="0.1"/>
    <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 6l10 7.5L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const IconCalendar = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
  </svg>
);

const IconDocs = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" opacity="0.3"/>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconSheets = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" opacity="0.2"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconDrive = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10a8 8 0 0 0 16 0V7l-10-5z" opacity="0.2"/>
    <path d="M12 2L2 7v10a8 8 0 0 0 16 0V7l-10-5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const IconSlack = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.5 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm2.5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm7 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm7 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" opacity="0.3"/>
    <circle cx="7.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="15" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const IconNotion = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M6 6h12M6 10h12M6 14h8" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
  </svg>
);

const PROVIDERS: Array<{
  key: ProviderKey;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}> = [
  {
    key: "gmail",
    label: "Gmail",
    description: "Send and search emails",
    icon: <IconGmail />,
    color: "text-red-500",
  },
  {
    key: "calendar",
    label: "Calendar",
    description: "Create and manage events",
    icon: <IconCalendar />,
    color: "text-blue-500",
  },
  {
    key: "docs",
    label: "Docs",
    description: "Create and edit documents",
    icon: <IconDocs />,
    color: "text-blue-400",
  },
  {
    key: "sheets",
    label: "Sheets",
    description: "Store tabular workflow data",
    icon: <IconSheets />,
    color: "text-green-500",
  },
  {
    key: "drive",
    label: "Drive",
    description: "Search and upload files",
    icon: <IconDrive />,
    color: "text-yellow-500",
  },
  {
    key: "slack",
    label: "Slack",
    description: "Send messages to your workspace",
    icon: <IconSlack />,
    color: "text-purple-500",
  },
  {
    key: "notion",
    label: "Notion",
    description: "Connect pages and databases",
    icon: <IconNotion />,
    color: "text-gray-300",
  },
];

export const ToolConnectPanel = () => {
  const { token, logout, user } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<ProviderKey | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [connections, setConnections] = useState<Record<ProviderKey, ProviderConnection>>(DEFAULT_CONNECTIONS);

  const connectedCount = useMemo(
    () => Object.values(connections).filter((connection) => connection.connected).length,
    [connections]
  );

  const fetchConnections = async (silent = false) => {
    if (!token) {
      return;
    }

    if (!silent) {
      setRefreshing(true);
    }

    try {
      const response = (await api.getOAuthConnections(token)) as Record<string, unknown>;
      const data = (response.data || {}) as Record<string, unknown>;
      const providers = Array.isArray(data.providers)
        ? (data.providers as Array<Record<string, unknown>>)
        : [];

      const nextConnections = { ...DEFAULT_CONNECTIONS };

      for (const provider of providers) {
        const key = provider.key as ProviderKey;
        if (!nextConnections[key]) {
          continue;
        }

        nextConnections[key] = {
          connected: Boolean(provider.connected),
          isExpired: Boolean(provider.isExpired),
          updatedAt: typeof provider.updatedAt === "string" ? provider.updatedAt : null,
        };
      }

      setConnections(nextConnections);
    } catch (error) {
      if (!silent) {
        toast.error(error instanceof Error ? error.message : "Failed to load tool connections");
      }
    } finally {
      if (!silent) {
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    void fetchConnections(false);
    const poll = window.setInterval(() => {
      void fetchConnections(true);
    }, 15000);

    return () => window.clearInterval(poll);
  }, [token]);

  const onLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const connectProvider = async (provider: ProviderKey) => {
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    setLoadingProvider(provider);

    try {
      const response = (await api.getOAuthUrl(provider, token)) as Record<string, unknown>;
      const data = (response.data || {}) as Record<string, unknown>;
      const url = data.url as string | undefined;

      if (!url) {
        toast.error(`No OAuth URL returned for ${provider}.`);
        return;
      }

      window.location.href = url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Failed to connect ${provider}`);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <section className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Integration Hub
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">Connected Integrations</h2>
          <p className="mt-2 text-sm text-white/60">
            Connect your favorite tools and services to power your workflows
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white/70">
            <span className={`h-2 w-2 rounded-full ${refreshing ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}></span>
            {connectedCount} of {PROVIDERS.length} connected
          </p>
        </div>

        <button
          className="w-fit rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/20"
          type="button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROVIDERS.map((provider) => {
          const connection = connections[provider.key];
          const isConnected = connection?.connected;
          const isExpired = connection?.isExpired;
          const statusLabel = !isConnected
            ? "Not connected"
            : isExpired
            ? "Expired"
            : "Connected";

          return (
            <button
              key={provider.key}
              type="button"
              onClick={() => connectProvider(provider.key)}
              disabled={loadingProvider !== null}
              className={`group relative rounded-xl border transition-all duration-200 p-5 text-left overflow-hidden ${
                isConnected && !isExpired
                  ? "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
                  : "border-white/10 bg-black/40 hover:bg-black/60 hover:border-white/20"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {/* Background accent */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 ${provider.color}`}></div>
              </div>

              {/* Icon and Title Row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className={`${provider.color} p-2.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}>
                  {provider.icon}
                </div>
                <span
                  className={`whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                    isConnected && !isExpired
                      ? "bg-green-500/20 text-green-300"
                      : isExpired
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {statusLabel}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-1">{provider.label}</h3>
              <p className="text-sm text-white/60 mb-4">{provider.description}</p>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    connectProvider(provider.key);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    isConnected && !isExpired
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {loadingProvider === provider.key
                    ? "Opening..."
                    : isConnected
                    ? "Reconnect"
                    : "Connect"}
                </button>
                {isConnected && connection?.updatedAt && (
                  <span className="text-[10px] text-white/40">
                    {new Date(connection.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* User Info Card */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
          Account
        </p>
        <p className="text-base font-semibold text-white">
          {user?.name || user?.email || "User"}
        </p>
        <p className="text-xs text-white/50 mt-1">
          {user?.email || "No email"}
        </p>
      </div>
    </section>
  );
};
