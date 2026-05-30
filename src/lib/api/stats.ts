import { API_URL } from "@/config/api";

export interface PlatformStatsSummary {
  users: number;
  wallets: number;
  escrows: number;
  transactions: number;
}

export interface RecentWallet {
  id: string;
  publicKey: string;
  createdAt: string;
}

export interface PlatformStatsResponse {
  summary: PlatformStatsSummary;
  recentWallets: RecentWallet[];
}

export async function getPlatformStats(): Promise<PlatformStatsResponse> {
  const response = await fetch(`${API_URL}/config/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.error?.message || "Failed to fetch platform statistics");
  }

  const result = await response.json();
  return result.data;
}
