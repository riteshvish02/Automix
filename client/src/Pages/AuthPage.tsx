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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Sophisticated multi-layer gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Primary gradient accent - top left */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl opacity-80"></div>
        
        {/* Secondary gradient accent - bottom right */}
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl opacity-80"></div>
        
        {/* Tertiary accent for depth */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl opacity-60"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="grid w-full gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left Section - Premium Info */}
          <section className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/70 border border-white/20 backdrop-blur">
                  ◆ Get Started
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-black text-white leading-tight">
                  Workflow
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    Automation
                  </span>
                </h1>
                
                <p className="text-lg text-white/70 max-w-xl leading-relaxed font-medium">
                  Seamlessly connect your tools and automate your workflow with AI-powered intelligence. Start your journey today.
                </p>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-green-400/50 bg-green-400/10 flex items-center justify-center mt-1 group-hover:bg-green-400/20 transition-colors">
                  <span className="text-sm text-green-300 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Secure Authentication</h3>
                  <p className="text-sm text-white/60 mt-1">JWT-based security with enterprise-grade protection</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-blue-400/50 bg-blue-400/10 flex items-center justify-center mt-1 group-hover:bg-blue-400/20 transition-colors">
                  <span className="text-sm text-blue-300 font-bold">⚡</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Real-time Sync</h3>
                  <p className="text-sm text-white/60 mt-1">Instant synchronization across all connected platforms</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-purple-400/50 bg-purple-400/10 flex items-center justify-center mt-1 group-hover:bg-purple-400/20 transition-colors">
                  <span className="text-sm text-purple-300 font-bold">🚀</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">AI-Powered</h3>
                  <p className="text-sm text-white/60 mt-1">Intelligent automation with machine learning capabilities</p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs text-white/50 font-medium uppercase tracking-widest mb-4">TRUSTED BY</p>
              <p className="text-sm text-white/70 font-medium">Join thousands of teams automating their workflows</p>
            </div>
          </section>

          {/* Right Section - Premium Auth Form */}
          <section className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/40">
            {/* Tab Navigation */}
            <div className="mb-8 flex gap-3 p-1 rounded-xl border border-white/15 bg-white/5">
              <button
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  mode === "login"
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                type="button"
                onClick={() => setMode("login")}
              >
                Sign In
              </button>
              <button
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                  mode === "register"
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                type="button"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>

            {/* Form Title */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-sm text-white/60 mt-2">
                {mode === "login"
                  ? "Sign in to access your workspace"
                  : "Join us and start automating today"}
              </p>
            </div>

            {/* Auth Form */}
            <form className="space-y-4" onSubmit={onSubmit}>
              {mode === "register" ? (
                <label className="block space-y-2">
                  <span className="text-sm font-bold text-white/90 uppercase tracking-wide">Full Name</span>
                  <input
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </label>
              ) : null}

              <label className="block space-y-2">
                <span className="text-sm font-bold text-white/90 uppercase tracking-wide">Email Address</span>
                <input
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-bold text-white/90 uppercase tracking-wide">Password</span>
                <input
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition-all focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </label>

              <button
                className="w-full mt-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3.5 font-bold text-white uppercase tracking-wide transition-all hover:from-blue-700 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:from-blue-600 disabled:hover:to-blue-500 shadow-lg shadow-blue-600/30"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? mode === "login"
                    ? "Signing In..."
                    : "Creating Account..."
                  : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/50 text-center">
                {mode === "login"
                  ? "Don't have an account? Switch to Register above"
                  : "Already have an account? Switch to Sign In above"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
