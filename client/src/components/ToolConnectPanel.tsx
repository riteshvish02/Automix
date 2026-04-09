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

// Professional brand SVG logos
const GmailLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#EA4335"/>
    <path d="M2 6l10 7.5L22 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 13.5V20" stroke="white" strokeWidth="1.5" opacity="0.3"/>
  </svg>
);

const CalendarLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
    <rect x="2" y="4" width="20" height="17" rx="2" fill="#4285F4"/>
    <path d="M7 2v4M17 2v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 10h20" stroke="white" strokeWidth="1.5" opacity="0.4"/>
  </svg>
);

const DocsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
    <rect x="3" y="2" width="14" height="19" rx="1.5" fill="#4285F4"/>
    <path d="M6 7h8M6 11h8M6 15h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SheetsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#0F9D58"/>
    <g stroke="white" strokeWidth="1" opacity="0.6">
      <line x1="2" y1="8" x2="22" y2="8"/>
      <line x1="2" y1="14" x2="22" y2="14"/>
      <line x1="8" y1="2" x2="8" y2="22"/>
      <line x1="14" y1="2" x2="14" y2="22"/>
    </g>
  </svg>
);

const DriveLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
    <circle cx="12" cy="12" r="10" fill="#4285F4"/>
    <path d="M8 12l3-5 5 8H8z" fill="#EA4335"/>
    <path d="M14 14l2-3 2 3h-4z" fill="#FBBC04"/>
    <circle cx="8" cy="15" r="1.5" fill="#34A853"/>
  </svg>
);

const SlackLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
    <rect x="3" y="9" width="4" height="12" rx="2" fill="#E01E5A"/>
    <rect x="9" y="3" width="4" height="12" rx="2" fill="#36C5F0"/>
    <rect x="15" y="6" width="4" height="9" rx="2" fill="#2EB67D"/>
    <rect x="6" y="15" width="9" height="4" rx="2" fill="#ECB22E"/>
  </svg>
);

const NotionLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="black"/>
    <g stroke="white" strokeWidth="1.2">
      <path d="M7 7h10M7 11h10M7 15h6"/>
    </g>
  </svg>
);

const PROVIDERS: Array<{
  key: ProviderKey;
  label: string;
  description: string;
  logo: React.ReactNode;
  accentColor: string;
  bgColor: string;
}> = [
  {
    key: "gmail",
    label: "Gmail",
    description: "Send and search emails seamlessly",
    logo: <GmailLogo />,
    accentColor: "from-red-600 to-red-500",
    bgColor: "hover:bg-red-500/10",
  },
  {
    key: "calendar",
    label: "Google Calendar",
    description: "Schedule and manage events",
    logo: <CalendarLogo />,
    accentColor: "from-blue-600 to-blue-500",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    key: "docs",
    label: "Google Docs",
    description: "Create and collaborate on documents",
    logo: <DocsLogo />,
    accentColor: "from-blue-500 to-cyan-500",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    key: "sheets",
    label: "Google Sheets",
    description: "Manage spreadsheets and data",
    logo: <SheetsLogo />,
    accentColor: "from-green-600 to-green-500",
    bgColor: "hover:bg-green-500/10",
  },
  {
    key: "drive",
    label: "Google Drive",
    description: "Store and sync your files",
    logo: <DriveLogo />,
    accentColor: "from-blue-500 to-orange-500",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    key: "slack",
    label: "Slack",
    description: "Collaborate with your team instantly",
    logo: <SlackLogo />,
    accentColor: "from-pink-600 to-cyan-500",
    bgColor: "hover:bg-pink-500/10",
  },
  {
    key: "notion",
    label: "Notion",
    description: "Organize knowledge and databases",
    logo: <NotionLogo />,
    accentColor: "from-gray-700 to-gray-500",
    bgColor: "hover:bg-gray-500/10",
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
    <section className="space-y-8">
      {/* Premium Header Section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
            ◆ Integration Ecosystem
          </p>
          <h2 className="text-5xl font-black text-white leading-tight max-w-2xl">
            Connect Your Tools
          </h2>
          <p className="text-base text-white/70 max-w-xl leading-relaxed">
            Seamlessly integrate your favorite platforms to automate workflows and streamline your operations.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5">
              <span className={`h-2 w-2 rounded-full transition-colors ${refreshing ? "bg-yellow-400 animate-pulse" : "bg-green-400"}`}></span>
              <span className="text-xs font-semibold text-white/80">
                {connectedCount} of {PROVIDERS.length} Active
              </span>
            </div>
            {connectedCount > 0 && (
              <div className="text-xs text-white/50 font-medium">
                {Math.round((connectedCount / PROVIDERS.length) * 100)}% Connected
              </div>
            )}
          </div>
        </div>

        <button
          className="w-fit inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 backdrop-blur"
          type="button"
          onClick={onLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </div>

      {/* Integrations Grid - Premium Design */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {PROVIDERS.map((provider) => {
          const connection = connections[provider.key];
          const isConnected = connection?.connected;
          const isExpired = connection?.isExpired;
          const statusLabel = !isConnected
            ? "Not connected"
            : isExpired
            ? "Token expired"
            : "Connected";

          return (
            <button
              key={provider.key}
              type="button"
              onClick={() => connectProvider(provider.key)}
              disabled={loadingProvider !== null}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                isConnected && !isExpired
                  ? "border-white/20 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 hover:border-white/40"
                  : "border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-white/20 hover:from-white/10"
              } disabled:cursor-not-allowed disabled:opacity-50 p-6 text-left`}
            >
              {/* Premium gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${provider.accentColor} blur-3xl opacity-15`}></div>
              </div>

              {/* Top section with logo and status */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-shrink-0 rounded-xl border border-white/20 bg-black/40 backdrop-blur p-3 group-hover:bg-white/5 transition-all duration-300">
                  {provider.logo}
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest whitespace-nowrap border transition-all ${
                    isConnected && !isExpired
                      ? "border-green-500/50 bg-green-500/15 text-green-300"
                      : isExpired
                      ? "border-yellow-500/50 bg-yellow-500/15 text-yellow-300"
                      : "border-white/20 bg-white/5 text-white/60"
                  }`}
                >
                  {statusLabel}
                </span>
              </div>

              {/* Content */}
              <div className="mb-5">
                <h3 className="text-lg font-bold text-white mb-2">{provider.label}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{provider.description}</p>
              </div>

              {/* Bottom section - Action and metadata */}
              <div className="flex items-center justify-between pt-5 border-t border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    connectProvider(provider.key);
                  }}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isConnected && !isExpired
                      ? "bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-lg shadow-green-500/25"
                      : "bg-white/10 text-white/90 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {loadingProvider === provider.key ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      Connecting...
                    </>
                  ) : isConnected ? (
                    <>
                      <span className="text-sm">✓</span>
                      Reconnect
                    </>
                  ) : (
                    "Connect"
                  )}
                </button>
                {isConnected && connection?.updatedAt && (
                  <span className="text-[11px] text-white/40 font-medium">
                    {new Date(connection.updatedAt).toLocaleDateString("en-US", { 
                      month: "short", 
                      day: "numeric" 
                    })}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* User Info Card - Premium */}
      <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50 mb-2">
              ◆ Account
            </p>
            <p className="text-lg font-bold text-white">
              {user?.name || user?.email || "User"}
            </p>
            <p className="text-sm text-white/60 mt-1 font-medium">
              {user?.email || "No email"}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            {(user?.name || user?.email || "U")[0]?.toUpperCase()}
          </div>
        </div>
      </div>
    </section>
  );
};
