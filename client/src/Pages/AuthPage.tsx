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
      {/* Gradient background effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Left Section - Info */}
          <section className="space-y-6">
            <div className="space-y-3">
              <div className="inline-block">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/60 border border-white/20">
                  Welcome Back
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white leading-tight">
                Automate your workflows.
              </h1>
              <p className="text-lg text-white/60">
                Connect your favorite tools and services to power intelligent workflows.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">✓</span>
                <span>Secure JWT-based authentication</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">✓</span>
                <span>AI-powered workflow automation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold mt-1">✓</span>
                <span>Connect Google, Slack, Notion, and more</span>
              </li>
            </ul>
          </section>

          {/* Right Section - Auth Form */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="mb-6 flex gap-2 p-1 rounded-lg border border-white/10 bg-white/5">
              <button
                className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                  mode === "login"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-white/60 hover:text-white"
                }`}
                type="button"
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                  mode === "register"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-white/60 hover:text-white"
                }`}
                type="button"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              {mode === "register" ? (
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-white/80">Name</span>
                  <input
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-blue-500 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </label>
              ) : null}

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-white/80">Email</span>
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-blue-500 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-white/80">Password</span>
                <input
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-blue-500 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </label>

              <button
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 font-semibold text-white transition hover:from-blue-700 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-70 shadow-lg shadow-blue-600/20"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
