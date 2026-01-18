import { NextRequest, NextResponse } from "next/server";
import {
  buildSecureCookie,
  buildDeleteCookie,
  parseCookies,
  COOKIE_CONFIG,
} from "@/lib/cookies";

/**
 * POST /api/auth/refresh
 * Refresh the auth token using the refresh token
 *
 * This endpoint:
 * 1. Reads the refresh token from httpOnly cookie
 * 2. Validates it with your backend auth service
 * 3. Issues new tokens if valid
 * 4. Clears cookies if invalid
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const cookieHeader = request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const refreshToken = cookies[COOKIE_CONFIG.REFRESH_TOKEN];

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token found" },
      { status: 401 }
    );
  }

  try {
    // TODO: Replace with actual backend API call
    // const backendResponse = await fetch(`${process.env.API_URL}/auth/refresh`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ refreshToken }),
    // });
    //
    // if (!backendResponse.ok) {
    //   throw new Error("Token refresh failed");
    // }
    //
    // const { token, refreshToken: newRefreshToken } = await backendResponse.json();

    // For now, simulate token refresh (remove in production)
    const token = `refreshed-token-${Date.now()}`;
    const newRefreshToken = `new-refresh-token-${Date.now()}`;

    const response = NextResponse.json({
      success: true,
      message: "Token refreshed successfully",
    });

    // Set new auth token
    response.headers.append(
      "Set-Cookie",
      buildSecureCookie(COOKIE_CONFIG.AUTH_TOKEN, token)
    );

    // Set new refresh token (token rotation for security)
    response.headers.append(
      "Set-Cookie",
      buildSecureCookie(
        COOKIE_CONFIG.REFRESH_TOKEN,
        newRefreshToken,
        COOKIE_CONFIG.REFRESH_EXPIRY_DAYS
      )
    );

    return response;
  } catch {
    // Clear invalid tokens
    const response = NextResponse.json(
      { error: "Token refresh failed" },
      { status: 401 }
    );

    response.headers.append("Set-Cookie", buildDeleteCookie(COOKIE_CONFIG.AUTH_TOKEN));
    response.headers.append("Set-Cookie", buildDeleteCookie(COOKIE_CONFIG.REFRESH_TOKEN));

    return response;
  }
}
