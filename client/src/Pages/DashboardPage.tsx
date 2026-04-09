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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Sophisticated gradient background with multiple layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Primary gradient accent */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl opacity-70"></div>
        
        {/* Secondary gradient accent */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl opacity-70"></div>
        
        {/* Tertiary accent for depth */}
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl opacity-50"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        {/* Elevated Hero Section */}
        <div className="mb-16 space-y-6">
          <div className="inline-block">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/70 border border-white/20 backdrop-blur">
              ◆ Automation Platform
            </span>
          </div>
          
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Automate Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Entire Workflow
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
              Connect all your tools in one unified platform. Orchestrate powerful workflows with AI and say goodbye to manual processes.
            </p>
          </div>

          {/* Stats/Features */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-green-400/50 bg-green-400/10">
                <span className="text-xs text-green-300 font-bold">✓</span>
              </div>
              <span className="text-sm text-white/70 font-medium">7+ Integrations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-blue-400/50 bg-blue-400/10">
                <span className="text-xs text-blue-300 font-bold">⚡</span>
              </div>
              <span className="text-sm text-white/70 font-medium">Real-time Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border border-purple-400/50 bg-purple-400/10">
                <span className="text-xs text-purple-300 font-bold">🔒</span>
              </div>
              <span className="text-sm text-white/70 font-medium">Enterprise Security</span>
            </div>
          </div>
        </div>

        {/* Tool Connect Panel */}
        <ToolConnectPanel />
      </div>
    </div>
  );
};
