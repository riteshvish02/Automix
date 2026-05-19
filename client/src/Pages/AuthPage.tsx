import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

type Mode = "login" | "register";

export const AuthPage = () => {
  const { token, login, register, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "register" && !name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      if (mode === "register") {
        await register({ name: name.trim(), email: email.trim(), password });
        toast.success("Account created successfully");
      } else {
        await login({ email: email.trim(), password });
        toast.success("Logged in successfully");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] text-neutral-200 font-sans">
      {/* Header */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 absolute">
        <div className="h-16 w-32 overflow-hidden flex-shrink-0">
          <img
            src="/final-logo.png"
            alt="Logo"
            className="h-full w-full object-cover object-center scale-[1.18]"
          />
        </div>
      </div>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.2em] text-neutral-500">
            Authentication
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-100 md:text-4xl">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
            {mode === "login"
              ? "Sign in to access your workspace, manage integrations, and run workflows."
              : "Get started with NexaFlow - connect your tools and automate in minutes."}
          </p>
        </div>

        {/* Auth card */}
        <div className="max-w-lg rounded-xl border border-neutral-800/50 bg-[#1c1c1c] p-6">
          {/* Tabs */}
          <div className="mb-6 flex gap-1 rounded-xl bg-[#161616] p-1">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-lg py-2.5 text-[13px] font-medium transition-all duration-150 ${
                  mode === m
                    ? "bg-[#252525] text-neutral-100 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {m === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "register" && (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-neutral-400">Name</span>
                <input
                  className="w-full rounded-xl border border-neutral-700/50 bg-[#161616] px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition focus:border-neutral-500 focus:bg-[#1a1a1a]"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ritesh"
                  required
                />
              </label>
            )}

            <label className="block space-y-2">
              <span className="text-sm font-medium text-neutral-400">Email</span>
              <input
                className="w-full rounded-xl border border-neutral-700/50 bg-[#161616] px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition focus:border-neutral-500 focus:bg-[#1a1a1a]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-neutral-400">Password</span>
              <input
                className="w-full rounded-xl border border-neutral-700/50 bg-[#161616] px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none transition focus:border-neutral-500 focus:bg-[#1a1a1a]"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <button
              className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                    <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Please wait...
                </span>
              ) : mode === "login" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-5 text-center text-xs text-neutral-600">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-neutral-400 transition hover:text-white underline underline-offset-2"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Features row below */}
        <div className="mt-8 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldIcon, label: "Secure JWT auth" },
            { icon: BoltIcon, label: "Agent orchestration" },
            { icon: LinkIcon, label: "Tool integrations" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 rounded-xl border border-neutral-800/50 bg-[#161616] px-4 py-3"
            >
              <f.icon />
              <span className="text-xs text-neutral-500">{f.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const ShieldIcon = () => (
  <svg
    className="h-4 w-4 flex-shrink-0 text-neutral-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BoltIcon = () => (
  <svg
    className="h-4 w-4 flex-shrink-0 text-neutral-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const LinkIcon = () => (
  <svg
    className="h-4 w-4 flex-shrink-0 text-neutral-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);
