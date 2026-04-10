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
  accent: string;
}> = [
  {
    key: "gmail",
    label: "Gmail",
    description: "Send and search emails",
    accent: "from-red-500 to-orange-400",
  },
  {
    key: "calendar",
    label: "Calendar",
    description: "Create and manage events",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    key: "docs",
    label: "Docs",
    description: "Create and edit documents",
    accent: "from-sky-500 to-indigo-400",
  },
  {
    key: "sheets",
    label: "Sheets",
    description: "Store tabular workflow data",
    accent: "from-emerald-500 to-lime-400",
  },
  {
    key: "drive",
    label: "Drive",
    description: "Search and upload files",
    accent: "from-violet-500 to-fuchsia-400",
  },
  {
    key: "slack",
    label: "Slack",
    description: "Send messages to your workspace",
    accent: "from-pink-500 to-rose-400",
  },
  {
    key: "notion",
    label: "Notion",
    description: "Connect pages and databases",
    accent: "from-zinc-700 to-zinc-500",
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
    <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Connected Workspace
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Connect your tools</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Your account is ready. Connect providers here so the agent can work with your
            Gmail, Calendar, Drive, Slack, and Notion data.
          </p>
          <p className="mt-2 text-xs font-medium text-slate-400">
            {connectedCount}/{PROVIDERS.length} connected {refreshing ? "(refreshing...)" : "(live)"}
          </p>
        </div>

        <button
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          type="button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PROVIDERS.map((provider) => {
          const connection = connections[provider.key];
          const isConnected = connection?.connected;
          const isExpired = connection?.isExpired;
          const statusLabel = !isConnected
            ? "Not connected"
            : isExpired
            ? "Connected (expired token)"
            : "Connected";

          return (
          <button
            key={provider.key}
            type="button"
            onClick={() => connectProvider(provider.key)}
            disabled={loadingProvider !== null}
            className="group rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${provider.accent}`} />
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{provider.label}</h3>
                <p className="mt-1 text-sm text-slate-400">{provider.description}</p>
                <p
                  className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    isConnected && !isExpired
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {statusLabel}
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-900 transition group-hover:bg-cyan-400">
                {loadingProvider === provider.key
                  ? "Opening..."
                  : isConnected
                  ? "Reconnect"
                  : "Connect"}
              </span>
            </div>
          </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-sm font-semibold text-white">Signed in as</p>
        <p className="mt-1 text-sm text-slate-400">
          {user?.name || user?.email || "Unknown user"}
        </p>
      </div>
    </section>
  );
};
