import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";

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

// Simple brand color icons as inline SVGs
const GmailIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#EA4335" />
    <path d="M2 6l10 7.5L22 6" stroke="white" strokeWidth="2" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="17" rx="2" fill="#4285F4" />
    <path d="M7 2v4M17 2v4" stroke="white" strokeWidth="2" />
  </svg>
);

const DocsIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <path d="M4 2h10v8h8v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#4285F4" />
  </svg>
);

const SheetsIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#0F9D58" />
  </svg>
);

const DriveIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <path d="M4 12l8-8 8 8M4 12l2 8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l2-8" fill="#4285F4" />
  </svg>
);

const SlackIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <g fill="#E01E5A">
      <rect x="3" y="9" width="4" height="12" rx="2" />
    </g>
    <g fill="#36C5F0">
      <rect x="9" y="3" width="4" height="12" rx="2" />
    </g>
    <g fill="#2EB67D">
      <rect x="15" y="6" width="4" height="9" rx="2" />
    </g>
    <g fill="#ECB22E">
      <rect x="6" y="15" width="9" height="4" rx="2" />
    </g>
  </svg>
);

const NotionIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="black" />
  </svg>
);

const PROVIDERS: Array<{
  key: ProviderKey;
  label: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
}> = [
  {
    key: "gmail",
    label: "Gmail",
    description: "Send and search emails seamlessly",
    icon: <GmailIcon />,
    accentColor: "from-red-600 to-red-500",
  },
  {
    key: "calendar",
    label: "Google Calendar",
    description: "Schedule and manage events",
    icon: <CalendarIcon />,
    accentColor: "from-blue-600 to-blue-500",
  },
  {
    key: "docs",
    label: "Google Docs",
    description: "Create and collaborate on documents",
    icon: <DocsIcon />,
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    key: "sheets",
    label: "Google Sheets",
    description: "Manage spreadsheets and data",
    icon: <SheetsIcon />,
    accentColor: "from-green-600 to-green-500",
  },
  {
    key: "drive",
    label: "Google Drive",
    description: "Store and sync your files",
    icon: <DriveIcon />,
    accentColor: "from-blue-500 to-orange-500",
  },
  {
    key: "slack",
    label: "Slack",
    description: "Collaborate with your team instantly",
    icon: <SlackIcon />,
    accentColor: "from-pink-600 to-cyan-500",
  },
  {
    key: "notion",
    label: "Notion",
    description: "Organize knowledge and databases",
    icon: <NotionIcon />,
    accentColor: "from-gray-700 to-gray-500",
  },
];

export function ToolConnectPanel() {
  const { user, logout } = useAuth();
  const [connections, setConnections] = useState<Record<ProviderKey, ProviderConnection>>(
    DEFAULT_CONNECTIONS
  );
  const [loadingProvider, setLoadingProvider] = useState<ProviderKey | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refreshConnections();
  }, []);

  const refreshConnections = async () => {
    setRefreshing(true);
    try {
      const res = await api.get("/auth/connections");
      setConnections(res.data || DEFAULT_CONNECTIONS);
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const connectProvider = async (provider: ProviderKey) => {
    setLoadingProvider(provider);
    try {
      const res = await api.post(`/auth/connect/${provider}`);
      window.location.href = res.data.authUrl;
    } catch (err: any) {
      toast.error(`Failed to connect ${provider}`);
      setLoadingProvider(null);
    }
  };

  const onLogout = () => {
    logout();
  };

  const connectedCount = useMemo(
    () => Object.values(connections).filter((c) => c.connected && !c.isExpired).length,
    [connections]
  );

  return (
    <section className="space-y-8">
      {/* Premium Header Section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50">
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

        <Button variant="outline" onClick={onLogout} className="w-fit">
          <span>↪</span>
          Logout
        </Button>
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
            <Card
              key={provider.key}
              className={`group relative overflow-hidden transition-all duration-300 cursor-pointer hover:border-white/40 ${
                isConnected && !isExpired
                  ? "border-white/20 bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10"
                  : "border-white/10 bg-gradient-to-br from-white/5 to-transparent"
              }`}
              onClick={() => connectProvider(provider.key)}
            >
              {/* Premium gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${provider.accentColor} blur-3xl opacity-15`}></div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-shrink-0 rounded-xl border border-white/20 bg-black/40 backdrop-blur p-3 group-hover:bg-white/5 transition-all duration-300">
                    {provider.icon}
                  </div>
                  <Badge
                    variant={
                      isConnected && !isExpired
                        ? "success"
                        : isExpired
                        ? "warning"
                        : "outline"
                    }
                  >
                    {statusLabel}
                  </Badge>
                </div>

                <CardTitle>{provider.label}</CardTitle>
                <CardDescription>{provider.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <Button
                    size="sm"
                    variant={isConnected && !isExpired ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      connectProvider(provider.key);
                    }}
                    disabled={loadingProvider !== null}
                  >
                    {loadingProvider === provider.key
                      ? "Connecting..."
                      : isConnected
                      ? "Reconnect"
                      : "Connect"}
                  </Button>
                  {isConnected && connection?.updatedAt && (
                    <span className="text-xs text-white/40">
                      {new Date(connection.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User Info Card - Premium */}
      <Card className="border-white/15 bg-gradient-to-br from-white/10 to-white/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                ◆ Account
              </p>
              <CardTitle className="mb-1">{user?.name || user?.email || "User"}</CardTitle>
              <CardDescription>{user?.email || "No email"}</CardDescription>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {(user?.name || user?.email || "U")[0]?.toUpperCase()}
            </div>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
}
