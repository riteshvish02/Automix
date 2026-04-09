import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle2, Lock, Mail, User, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";

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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Sophisticated multi-layer gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Primary gradient accent - top left */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl opacity-80"></div>
        
        {/* Secondary gradient accent - bottom right */}
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl opacity-80"></div>
        
        {/* Tertiary accent for depth */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl opacity-60"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="grid w-full gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left Section - Premium Info */}
          <section className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="rounded-full bg-muted px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border">
                  ◆ Get Started
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-black text-foreground leading-tight">
                  Workflow
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    Automation
                  </span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-medium">
                  Seamlessly connect your tools and automate your workflow with AI-powered intelligence. Start your journey today.
                </p>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-green-400/50 bg-green-400/10 flex items-center justify-center mt-1 group-hover:bg-green-400/20 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Secure Authentication</h3>
                  <p className="text-sm text-muted-foreground mt-1">JWT-based security with enterprise-grade protection</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-blue-400/50 bg-blue-400/10 flex items-center justify-center mt-1 group-hover:bg-blue-400/20 transition-colors">
                  <Lock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Real-time Sync</h3>
                  <p className="text-sm text-muted-foreground mt-1">Instant synchronization across all connected platforms</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-purple-400/50 bg-purple-400/10 flex items-center justify-center mt-1 group-hover:bg-purple-400/20 transition-colors">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground mt-1">Intelligent automation with machine learning capabilities</p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-4">TRUSTED BY</p>
              <p className="text-sm text-muted-foreground font-medium">Join thousands of teams automating their workflows</p>
            </div>
          </section>

          {/* Right Section - Premium Auth Form */}
          <section className="space-y-6">
            <Card className="border-border/50 bg-card/80 backdrop-blur-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </CardTitle>
                <CardDescription>
                  {mode === "login"
                    ? "Sign in to access your workspace"
                    : "Join us and start automating today"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Tab Navigation */}
                <div className="mb-6 flex gap-3 p-1 rounded-lg border border-border bg-muted">
                  <button
                    className={`flex-1 rounded-md px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      mode === "login"
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                    type="button"
                    onClick={() => setMode("login")}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                  <button
                    className={`flex-1 rounded-md px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      mode === "register"
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                    type="button"
                    onClick={() => setMode("register")}
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
                  </button>
                </div>

                {/* Auth Form */}
                <form className="space-y-4" onSubmit={onSubmit}>
                  {mode === "register" ? (
                    <label className="block space-y-2">
                      <span className="text-sm font-bold text-foreground uppercase tracking-wide flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </span>
                      <input
                        className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </label>
                  ) : null}

                  <label className="block space-y-2">
                    <span className="text-sm font-bold text-foreground uppercase tracking-wide flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </span>
                    <input
                      className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-bold text-foreground uppercase tracking-wide flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </span>
                    <input
                      className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/50"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </label>

                  <Button
                    className="w-full mt-6 gap-2"
                    size="lg"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        {mode === "login" ? "Signing In..." : "Creating Account..."}
                      </>
                    ) : mode === "login" ? (
                      <>
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    {mode === "login"
                      ? "Don't have an account? Click Register above"
                      : "Already have an account? Click Sign In above"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
