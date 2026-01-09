"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useAuthStore } from "@/stores/auth-store";
import { useModeStore } from "@/stores/mode-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

interface ActivityItem {
  id: string;
  type: "offer_created" | "proposal_received" | "message" | "payment";
  title: string;
  description: string;
  time: string;
}

const MOCK_STATS: StatCard[] = [
  {
    label: "Active Offers",
    value: 5,
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    color: "bg-primary",
  },
  {
    label: "Pending Proposals",
    value: 12,
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "bg-secondary",
  },
  {
    label: "Unread Messages",
    value: 3,
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    color: "bg-accent",
  },
  {
    label: "Total Spent",
    value: "$2,450",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "bg-success",
  },
];

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    type: "proposal_received",
    title: "New proposal received",
    description: "John D. submitted a proposal for 'Website Redesign'",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "message",
    title: "New message",
    description: "Sarah M. sent you a message about 'Mobile App Development'",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "offer_created",
    title: "Offer published",
    description: "Your offer 'Logo Design' is now live",
    time: "1 day ago",
  },
  {
    id: "4",
    type: "payment",
    title: "Payment completed",
    description: "You paid $500 for 'Backend API Development'",
    time: "2 days ago",
  },
];

const ACTIVITY_ICONS: Record<ActivityItem["type"], string> = {
  offer_created: "M12 4v16m8-8H4",
  proposal_received: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  message: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  payment: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
};

const CARD_STYLES = cn(
  "p-6 rounded-2xl",
  "bg-white",
  "shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]"
);

const BUTTON_STYLES = cn(
  "flex items-center gap-3 px-6 py-4 rounded-xl",
  "bg-white",
  "shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
  "hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]",
  "active:shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]",
  "transition-all duration-200"
);

export default function ClientDashboardPage(): React.JSX.Element {
  const user = useAuthStore((state) => state.user);
  const { mode, setMode } = useModeStore();
  const router = useRouter();

  useEffect(() => {
    if (mode !== "client") {
      setMode("client");
    }
  }, [mode, setMode]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome back, {user?.username || "Client"}!
        </h1>
        <p className="text-text-secondary mt-1">
          Manage your offers and find the perfect freelancers for your projects
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/app/client/offers/new" className={BUTTON_STYLES}>
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Create Offer</h3>
            <p className="text-sm text-text-secondary">Post a new job for freelancers</p>
          </div>
        </Link>

        <Link href="/marketplace" className={BUTTON_STYLES}>
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">View Marketplace</h3>
            <p className="text-sm text-text-secondary">Browse available freelancers</p>
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat) => (
          <div key={stat.label} className={CARD_STYLES}>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  stat.color
                )}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className={CARD_STYLES}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
          <button className="text-sm text-primary hover:text-primary-hover transition-colors cursor-pointer">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {MOCK_ACTIVITY.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl",
                "bg-background",
                "shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
              )}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={ACTIVITY_ICONS[activity.type]}
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary">{activity.title}</p>
                <p className="text-sm text-text-secondary truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-text-secondary whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
