/**
 * Secure Cookie Utilities
 *
 * For security-sensitive data (auth tokens), use server-side cookie management
 * via API routes with httpOnly, Secure, and SameSite flags.
 *
 * Client-side cookies (via document.cookie) should only be used for
 * non-sensitive preferences that need to be accessed by JavaScript.
 */

// Cookie configuration
export const COOKIE_CONFIG = {
  // Session cookie name for auth state (non-sensitive, for UI state)
  AUTH_STATE: "auth-state",
  // Secure token cookie name (set by server only)
  AUTH_TOKEN: "auth-token",
  // Refresh token cookie name (set by server only)
  REFRESH_TOKEN: "refresh-token",
  // Cookie expiry in days
  EXPIRY_DAYS: 7,
  // Refresh token expiry in days
  REFRESH_EXPIRY_DAYS: 30,
} as const;

// Check if we're in production
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Get secure cookie options for server-side cookie setting
 * These options are used in API routes with Set-Cookie header
 */
export function getSecureCookieOptions(maxAgeDays: number = COOKIE_CONFIG.EXPIRY_DAYS): string {
  const maxAge = maxAgeDays * 24 * 60 * 60; // Convert days to seconds
  const options = [
    `Max-Age=${maxAge}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];

  // Add Secure flag in production (requires HTTPS)
  if (isProduction()) {
    options.push("Secure");
  }

  return options.join("; ");
}

/**
 * Build a Set-Cookie header value for secure tokens
 */
export function buildSecureCookie(name: string, value: string, maxAgeDays?: number): string {
  const encodedValue = encodeURIComponent(value);
  return `${name}=${encodedValue}; ${getSecureCookieOptions(maxAgeDays)}`;
}

/**
 * Build a cookie deletion header (expires immediately)
 */
export function buildDeleteCookie(name: string): string {
  const options = [
    "Max-Age=0",
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];

  if (isProduction()) {
    options.push("Secure");
  }

  return `${name}=; ${options.join("; ")}`;
}

/**
 * Parse cookies from a cookie header string
 */
export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce(
    (cookies, cookie) => {
      const [name, ...valueParts] = cookie.trim().split("=");
      if (name) {
        cookies[name] = decodeURIComponent(valueParts.join("="));
      }
      return cookies;
    },
    {} as Record<string, string>
  );
}

/**
 * Client-side cookie utilities for non-sensitive data only
 * DO NOT use these for auth tokens or sensitive information
 */
export const clientCookies = {
  get(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  },

  set(name: string, value: string, days: number = COOKIE_CONFIG.EXPIRY_DAYS): void {
    if (typeof document === "undefined") return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    // Client-side cookies cannot be httpOnly, so only use for non-sensitive data
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  },

  remove(name: string): void {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  },
};
