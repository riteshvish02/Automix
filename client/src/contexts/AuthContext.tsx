import { createContext, useMemo, useState } from "react";
import { api } from "../lib/api";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const TOKEN_KEY = "nexaflow_token";
const USER_KEY = "nexaflow_user";

const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const parseAuthResponse = (payload: Record<string, unknown>) => {
  const data = (payload.data || {}) as Record<string, unknown>;
  const token = (data.token || payload.token) as string | undefined;
  const userRaw = (data.user || payload.user || null) as Record<string, unknown> | null;

  if (!token || !userRaw) {
    throw new Error("Invalid auth response: token/user missing");
  }

  const user: User = {
    id: String(userRaw.id || ""),
    name: String(userRaw.name || ""),
    email: String(userRaw.email || ""),
  };

  return { token, user };
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSession = (nextToken: string, nextUser: User) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  };

  const login = async (input: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.login(input);
      const parsed = parseAuthResponse(response);
      setSession(parsed.token, parsed.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (input: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.register(input);
      const parsed = parseAuthResponse(response);
      setSession(parsed.token, parsed.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Register failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const value = useMemo(
    () => ({ token, user, loading, error, login, register, logout }),
    [token, user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
