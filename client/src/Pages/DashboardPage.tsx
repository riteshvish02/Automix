import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ToolConnectPanel } from "../components/ToolConnectPanel";
import { MessageSquare } from "lucide-react";

export const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauth = params.get("oauth");
    const provider = params.get("provider");
    const message = params.get("message");

    if (oauth && provider) {
      const kind = oauth === "success" ? "success" : "error";
      const fallback =
        oauth === "success"
          ? `${provider} connected successfully.`
          : `${provider} connection failed.`;
      const toastMessage = `${provider.toUpperCase()}: ${message || fallback}`;

      if (kind === "success") {
        toast.success(toastMessage);
      } else {
        toast.error(toastMessage);
      }

      window.history.replaceState({}, "", location.pathname);
    }
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/25">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                NexaFlow Workspace
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
                Connect your tools from one place.
              </h1>
              <p className="mt-4 max-w-3xl text-sm text-slate-300 md:text-base">
                This is your protected tool hub. Connect Google, Slack, and Notion so the agent
                can act on your behalf.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="flex h-fit items-center gap-2 rounded-xl border border-cyan-500 bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Chat</span>
          </button>
        </div>

        <ToolConnectPanel />
      </div>
    </div>
  );
};
