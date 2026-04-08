const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

type ApiMethod = "GET" | "POST";

const request = async (
  path: string,
  method: ApiMethod,
  body?: unknown,
  token?: string
) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;

  if (!response.ok) {
    const message =
      (typeof payload.message === "string" && payload.message) ||
      (typeof payload.error === "string" && payload.error) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
};

export const api = {
  register: (input: { name: string; email: string; password: string }) =>
    request("/auth/create", "POST", input),
  login: (input: { email: string; password: string }) =>
    request("/auth/login", "POST", input),
  getOAuthUrl: (
    provider: "gmail" | "calendar" | "docs" | "sheets" | "drive" | "slack" | "notion",
    token: string
  ) => request(`/tool/${provider}/oauth`, "GET", undefined, token),
  getOAuthConnections: (token: string) =>
    request("/tool/oauth-tokens", "GET", undefined, token),
};
