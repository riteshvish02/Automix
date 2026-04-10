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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center p-6">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <p className="mb-3 inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300">
              NEXAFLOW
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Automate your workflows with connected tools.
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">
              Start by logging in, then connect providers from your dashboard.
            </p>
            <ul className="mt-8 space-y-2 text-sm text-slate-400">
              <li>Secure JWT auth</li>
              <li>Conversation-aware agent orchestration</li>
              <li>Google, Slack, and Notion integrations</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <div className="mb-6 inline-flex rounded-full bg-slate-800 p-1">
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === "login"
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-300 hover:text-white"
                }`}
                type="button"
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === "register"
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-300 hover:text-white"
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
                  <span className="text-sm font-medium text-slate-300">Name</span>
                  <input
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-500 transition focus:ring-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ritesh"
                    required
                  />
                </label>
              ) : null}

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-300">Email</span>
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-500 transition focus:ring-2"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-300">Password</span>
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-500 transition focus:ring-2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
              </label>

              <button
                className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login"
                  : "Create account"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
