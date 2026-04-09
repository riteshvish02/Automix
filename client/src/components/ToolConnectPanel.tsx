import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Mail,
  Calendar,
  FileText,
  Sheet3,
  Cloud,
  MessageSquare,
  Database,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Zap,
  User,
} from "lucide-react";
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
    description: "Send and search emails seamlessly",
    icon: <Mail className="w-6 h-6" />,
    color: "text-red-500",
  },
  {
    key: "calendar",
    label: "Google Calendar",
    description: "Schedule and manage events",
    icon: <Calendar className="w-6 h-6" />,
    color: "text-blue-500",
  },
  {
    key: "docs",
    label: "Google Docs",
    description: "Create and collaborate on documents",
    icon: <FileText className="w-6 h-6" />,
    color: "text-blue-400",
  },
  {
    key: "sheets",
    label: "Google Sheets",
    description: "Manage spreadsheets and data",
    icon: <Sheet3 className="w-6 h-6" />,
    color: "text-green-500",
  },
  {
    key: "drive",
    label: "Google Drive",
    description: "Store and sync your files",
    icon: <Cloud className="w-6 h-6" />,
    color: "text-yellow-500",
  },
  {
    key: "slack",
    label: "Slack",
    description: "Collaborate with your team instantly",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "text-purple-500",
  },
  {
    key: "notion",
    label: "Notion",
    description: "Organize knowledge and databases",
    icon: <Database className="w-6 h-6" />,
    color: "text-gray-300",
  },
];

export function ToolConnectPanel() {
  const { user } = useAuth();
  const [connections, setConnections] = useState<Record<ProviderKey, ProviderConnection>>(
    DEFAULT_CONNECTIONS
  );
  const [loadingProvider, setLoadingProvider] = useState<ProviderKey | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const connectedCount = useMemo(
    () => Object.values(connections).filter(c => c.connected && !c.isExpired).length,
    [connections]
  );

  useEffect(() => {
    setRefreshing(true);
    api
      .get("/api/auth/connections")
      .then((res) => {
        setConnections(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch connections:", err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  const connectProvider = async (provider: ProviderKey) => {
    setLoadingProvider(provider);
    try {
      const response = await api.post(`/api/auth/${provider}/auth-url`);
      window.location.href = response.data.authUrl;
    } catch (err) {
      toast.error(`Failed to connect ${provider}`);
      console.error(err);
    } finally {
      setLoadingProvider(null);
    }
  };

  const onLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      window.location.href = "/";
    } catch (err) {
      toast.error("Failed to logout");
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="flex items-center justify-center w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Integration Hub
              </span>
            </div>
            <h2 className="text-4xl font-black text-white">
              Connect Your Tools
            </h2>
            <p className="text-base text-muted-foreground max-w-xl">
              Seamlessly integrate your favorite platforms to automate workflows and streamline your operations.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Connection Stats */}
        <div className="flex items-center gap-2 pt-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <Zap className={`w-3.5 h-3.5 ${refreshing ? "text-yellow-500 animate-pulse" : "text-green-500"}`} />
            <span className="text-xs font-semibold text-foreground">
              {connectedCount} of {PROVIDERS.length} Connected
            </span>
          </div>
          {connectedCount > 0 && (
            <div className="text-xs text-muted-foreground font-medium">
              {Math.round((connectedCount / PROVIDERS.length) * 100)}% Active
            </div>
          )}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PROVIDERS.map((provider) => {
          const connection = connections[provider.key];
          const isConnected = connection?.connected;
          const isExpired = connection?.isExpired;

          return (
            <Card
              key={provider.key}
              className="group relative overflow-hidden border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl`}></div>
              </div>

              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors">
                      {provider.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{provider.label}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {provider.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    {isConnected && !isExpired ? (
                      <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Connected
                      </Badge>
                    ) : isExpired ? (
                      <Badge variant="warning" className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Expired
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground">
                        <AlertCircle className="w-3 h-3" />
                        Not Connected
                      </Badge>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant={isConnected && !isExpired ? "default" : "secondary"}
                    onClick={() => connectProvider(provider.key)}
                    disabled={loadingProvider !== null}
                    className="gap-2"
                  >
                    {loadingProvider === provider.key ? (
                      <>
                        <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        Connecting...
                      </>
                    ) : isConnected ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Reconnect
                      </>
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>

                {isConnected && connection?.updatedAt && (
                  <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/50">
                    Last synced:{" "}
                    {new Date(connection.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "2-digit",
                    })}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User Account Card */}
      <Card className="border-border/50 bg-muted/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {(user?.name || user?.email || "U")[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Account
                </p>
                <p className="text-base font-semibold text-foreground">
                  {user?.name || user?.email || "User"}
                </p>
              </div>
            </div>
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
