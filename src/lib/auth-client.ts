/**
 * Auth Client
 *
 * Client-side utilities for interacting with the secure auth API.
 * Tokens are stored in httpOnly cookies managed by the server.
 */

interface TokenResponse {
  success: boolean;
  error?: string;
}

interface AuthStatus {
  authenticated: boolean;
  hasRefreshToken: boolean;
}

/**
 * Store auth tokens securely via server API
 * The tokens will be stored in httpOnly cookies
 */
export async function setAuthTokens(
  token: string,
  refreshToken?: string
): Promise<TokenResponse> {
  try {
    const response = await fetch("/api/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, refreshToken }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to store tokens",
    };
  }
}

/**
 * Check if user is authenticated (has valid token cookie)
 */
export async function checkAuthStatus(): Promise<AuthStatus> {
  try {
    const response = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return { authenticated: false, hasRefreshToken: false };
    }

    return await response.json();
  } catch {
    return { authenticated: false, hasRefreshToken: false };
  }
}

/**
 * Clear all auth cookies (logout)
 */
export async function clearAuthTokens(): Promise<TokenResponse> {
  try {
    const response = await fetch("/api/auth/token", {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to clear tokens",
    };
  }
}

/**
 * Refresh the auth token using the refresh token
 */
export async function refreshAuthToken(): Promise<TokenResponse> {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      return { success: false, error: data.error };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to refresh token",
    };
  }
}

/**
 * Setup automatic token refresh
 * Call this once when the app loads if user is authenticated
 */
export function setupTokenRefresh(intervalMinutes: number = 10): () => void {
  const intervalMs = intervalMinutes * 60 * 1000;

  const intervalId = setInterval(async () => {
    const status = await checkAuthStatus();

    if (status.authenticated && status.hasRefreshToken) {
      await refreshAuthToken();
    }
  }, intervalMs);

  // Return cleanup function
  return () => clearInterval(intervalId);
}
