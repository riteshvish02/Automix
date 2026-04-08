export type ErrorClass = 
  | "TIMEOUT"
  | "RATE_LIMIT"
  | "TRANSIENT"
  | "PERMANENT";

const classifyError = (error: any): ErrorClass => {
  const msg = error?.message?.toLowerCase() || "";
  const code = error?.code;

  // Timeout errors
  if (msg.includes("timeout") || msg.includes("timed out") || code === "ETIMEDOUT") {
    return "TIMEOUT";
  }

  // Rate limit errors
  if (
    msg.includes("rate limit") ||
    msg.includes("429") ||
    msg.includes("too many requests") ||
    code === 429
  ) {
    return "RATE_LIMIT";
  }

  // Transient service errors
  if (
    msg.includes("502") ||
    msg.includes("503") ||
    msg.includes("504") ||
    msg.includes("ECONNREFUSED") ||
    msg.includes("ECONNRESET") ||
    code >= 500
  ) {
    return "TRANSIENT";
  }

  // Everything else is permanent (client error, not found, permission, etc)
  return "PERMANENT";
};

const getRetryDelay = (attempt: number, errorClass: ErrorClass): number => {
  if (errorClass === "RATE_LIMIT") {
    // Longer backoff for rate limits: 2s, 4s, 8s
    return Math.min(1000 * Math.pow(2, attempt), 30000);
  }

  if (errorClass === "TIMEOUT" || errorClass === "TRANSIENT") {
    // Standard exponential backoff: 500ms, 1s, 2s, 4s
    return Math.min(500 * Math.pow(2, attempt), 10000);
  }

  // No retry for permanent errors
  return -1;
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  onRetry?: (attempt: number, error: Error, delay: number) => void
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error as Error;
      const errorClass = classifyError(error);

      // Permanent errors don't retry
      if (errorClass === "PERMANENT") {
        throw error;
      }

      const delay = getRetryDelay(attempt, errorClass);

      // Last attempt, don't delay
      if (attempt === maxAttempts - 1) {
        throw error;
      }

      // Log retry if callback provided
      if (onRetry) {
        onRetry(attempt + 1, error, delay);
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error("Maximum retries exceeded");
};

export default {
  classifyError,
  getRetryDelay,
  withRetry,
};
