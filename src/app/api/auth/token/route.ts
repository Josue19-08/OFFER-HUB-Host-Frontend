import { NextRequest, NextResponse } from "next/server";
import {
  buildSecureCookie,
  buildDeleteCookie,
  parseCookies,
  COOKIE_CONFIG,
} from "@/lib/cookies";

/**
 * POST /api/auth/token
 * Set secure httpOnly cookies for authentication tokens
 *
 * Request body:
 * - token: The auth token to store
 * - refreshToken?: Optional refresh token
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { token, refreshToken } = body;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });

    // Set the main auth token as httpOnly cookie
    response.headers.append(
      "Set-Cookie",
      buildSecureCookie(COOKIE_CONFIG.AUTH_TOKEN, token)
    );

    // Set refresh token if provided (with longer expiry)
    if (refreshToken) {
      response.headers.append(
        "Set-Cookie",
        buildSecureCookie(
          COOKIE_CONFIG.REFRESH_TOKEN,
          refreshToken,
          COOKIE_CONFIG.REFRESH_EXPIRY_DAYS
        )
      );
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

/**
 * GET /api/auth/token
 * Verify if auth token exists (without exposing the token value)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const cookieHeader = request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);

  const hasToken = Boolean(cookies[COOKIE_CONFIG.AUTH_TOKEN]);
  const hasRefreshToken = Boolean(cookies[COOKIE_CONFIG.REFRESH_TOKEN]);

  return NextResponse.json({
    authenticated: hasToken,
    hasRefreshToken,
  });
}

/**
 * DELETE /api/auth/token
 * Clear all auth cookies (logout)
 */
export async function DELETE(): Promise<NextResponse> {
  const response = NextResponse.json({ success: true });

  // Clear auth token
  response.headers.append("Set-Cookie", buildDeleteCookie(COOKIE_CONFIG.AUTH_TOKEN));

  // Clear refresh token
  response.headers.append("Set-Cookie", buildDeleteCookie(COOKIE_CONFIG.REFRESH_TOKEN));

  return response;
}
