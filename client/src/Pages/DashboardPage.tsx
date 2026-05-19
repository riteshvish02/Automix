import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ToolConnectPanel } from "../components/ToolConnectPanel";

export const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauth = params.get("oauth");
    const provider = params.get("provider");
    const message = params.get("message");

    if (oauth && provider) {
      const fallback =
        oauth === "success"
          ? `${provider} connected successfully.`
          : `${provider} connection failed.`;
      const toastMessage = `${provider.toUpperCase()}: ${message || fallback}`;

      if (oauth === "success") {
        toast.success(toastMessage);
      } else {
        toast.error(toastMessage);
      }

      window.history.replaceState({}, "", location.pathname);
    }
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-[#181818] text-neutral-200 font-sans">
      {/* ── Header ── */}
      <header className="border-b border-neutral-800/60 bg-[#181818]">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Logo */}
             <div className="">
            <div className="flex items-center">
              <div className="h-16 w-32 overflow-hidden flex-shrink-0">
                <img
                  src="/final-logo.png"
                  alt="Automix logo"
                  className="h-full w-full object-cover object-center scale-[1.18]"
                />
              </div>
            </div>
          </div>
          </div>

          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-2 rounded-xl border border-neutral-700/50 bg-neutral-800/50 px-4 py-2 text-[13px] font-medium text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600 transition-all duration-150"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Chat
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Workspace
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-100 md:text-4xl">
            Connect your tools
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
            Link your accounts so the agent can act on your behalf — send emails,
            manage events, search files, and more.
          </p>
        </div>

        {/* Tools */}
        <ToolConnectPanel />
      </main>
    </div>
  );
};
