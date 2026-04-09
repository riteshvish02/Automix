import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ToolConnectPanel } from "../components/ToolConnectPanel";

export const DashboardPage = () => {
  const location = useLocation();

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
    <div className="min-h-screen bg-black text-white">
      {/* Gradient background effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 space-y-3">
          <div className="inline-block">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/60 border border-white/20">
              Workflow Automation
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight sm:text-6xl">
            Automate Everything.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              All in One Place.
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Connect your favorite tools and services to build powerful, intelligent workflows powered by AI.
          </p>
        </div>

        {/* Tool Connect Panel */}
        <ToolConnectPanel />
      </div>
    </div>
  );
};
