import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";

export function AuthPage() {
  const { user, loading, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // User is already logged in, redirect to dashboard
      return;
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
        toast.success("Logged in successfully!");
      } else {
        await register(name, email, password);
        toast.success("Account created successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium multi-layer gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Primary gradient - top left blue */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-600/40 via-blue-600/20 to-transparent blur-3xl opacity-100 animate-pulse" style={{ animationDuration: '8s' }}></div>
        
        {/* Secondary gradient - bottom right purple */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-purple-600/40 via-purple-600/20 to-transparent blur-3xl opacity-100 animate-pulse" style={{ animationDuration: '10s' }}></div>
        
        {/* Accent gradient - right cyan */}
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-cyan-500/30 to-transparent blur-3xl opacity-80"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30"></div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-8xl items-center px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full grid gap-16 lg:gap-20 lg:grid-cols-2 items-center">
          {/* Left Section - Premium Hero */}
          <section className="space-y-10 max-w-xl">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"></span>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">
                  Automation Powered
                </span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight">
                  Automate
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    Everything
                  </span>
                </h1>
                
                <p className="text-xl text-white/70 leading-relaxed max-w-md font-medium">
                  Connect your favorite tools, automate workflows with AI intelligence, and focus on growth.
                </p>
              </div>
            </div>

            {/* Premium Feature List */}
            <div className="space-y-5 pt-4">
              <div className="flex items-start gap-4 group cursor-default">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-11 w-11 rounded-lg border border-green-500/50 bg-gradient-to-br from-green-500/20 to-green-500/10 group-hover:border-green-400/80 group-hover:bg-green-500/30 transition-all duration-300">
                    <svg className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white">Bank-Level Security</h3>
                  <p className="text-sm text-white/60 mt-1.5 leading-relaxed">JWT-based encryption with enterprise-grade row-level security</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-default">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-11 w-11 rounded-lg border border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-blue-500/10 group-hover:border-blue-400/80 group-hover:bg-blue-500/30 transition-all duration-300">
                    <svg className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white">Instant Sync</h3>
                  <p className="text-sm text-white/60 mt-1.5 leading-relaxed">Real-time data synchronization across all connected platforms</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-default">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-11 w-11 rounded-lg border border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-purple-500/10 group-hover:border-purple-400/80 group-hover:bg-purple-500/30 transition-all duration-300">
                    <svg className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white">AI-Powered Workflows</h3>
                  <p className="text-sm text-white/60 mt-1.5 leading-relaxed">Intelligent automation with machine learning and natural language</p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Section - Premium Auth Card */}
          <section className="relative">
            {/* Animated background glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition duration-1000"></div>
            
            {/* Card */}
            <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/12 to-white/8 p-10 backdrop-blur-2xl overflow-hidden">
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

              {/* Tab Navigation */}
              <div className="mb-10 flex gap-2 p-1.5 rounded-xl border border-white/15 bg-white/8">
                <button
                  className={`flex-1 rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    mode === "login"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-xl shadow-blue-600/50"
                      : "text-white/60 hover:text-white"
                  }`}
                  type="button"
                  onClick={() => setMode("login")}
                >
                  Sign In
                </button>
                <button
                  className={`flex-1 rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    mode === "register"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-xl shadow-blue-600/50"
                      : "text-white/60 hover:text-white"
                  }`}
                  type="button"
                  onClick={() => setMode("register")}
                >
                  Register
                </button>
              </div>

              {/* Form Title */}
              <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-black text-white">
                  {mode === "login" ? "Welcome Back" : "Join the Platform"}
                </h2>
                <p className="text-sm text-white/60 leading-relaxed">
                  {mode === "login"
                    ? "Sign in to your workspace and manage all integrations"
                    : "Create your account and start automating in minutes"}
                </p>
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={onSubmit}>
                {mode === "register" && (
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider">Full Name</label>
                    <input
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider">Email</label>
                  <input
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider">Password</label>
                  <input
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:bg-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold py-4 text-sm uppercase tracking-wider shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? mode === "login"
                      ? "Signing In..."
                      : "Creating Account..."
                    : mode === "login"
                    ? "Sign In"
                    : "Create Account"}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs text-white/50 text-center font-medium">
                  {mode === "login"
                    ? "Don't have an account? Click Register"
                    : "Already have an account? Click Sign In"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
