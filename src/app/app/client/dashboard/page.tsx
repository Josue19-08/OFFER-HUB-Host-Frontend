"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { useModeStore } from "@/stores/mode-store";
import { cn } from "@/lib/cn";
import {
  NEUMORPHIC_CARD,
  NEUMORPHIC_BUTTON,
  NEUMORPHIC_INSET,
  ICON_CONTAINER,
} from "@/lib/styles";
import { Icon, ICON_PATHS } from "@/components/ui/Icon";

interface StatCard {
  label: string;
  value: string | number;
  iconPath: string;
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
    iconPath: ICON_PATHS.briefcase,
    color: "bg-primary",
  },
  {
    label: "Pending Proposals",
    value: 12,
    iconPath: ICON_PATHS.document,
    color: "bg-secondary",
  },
  {
    label: "Unread Messages",
    value: 3,
    iconPath: ICON_PATHS.chat,
    color: "bg-accent",
  },
  {
    label: "Total Spent",
    value: "$2,450",
    iconPath: ICON_PATHS.currency,
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
  offer_created: ICON_PATHS.plus,
  proposal_received: ICON_PATHS.document,
  message: ICON_PATHS.chat,
  payment: ICON_PATHS.creditCard,
};

interface QuickActionProps {
  href: string;
  iconPath: string;
  iconColor: string;
  title: string;
  description: string;
}

function QuickAction({
  href,
  iconPath,
  iconColor,
  title,
  description,
}: QuickActionProps): React.JSX.Element {
  return (
    <Link href={href} className={NEUMORPHIC_BUTTON}>
      <div className={cn(ICON_CONTAINER, iconColor)}>
        <Icon path={iconPath} className="text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </Link>
  );
}

interface StatCardComponentProps {
  stat: StatCard;
}

function StatCardComponent({ stat }: StatCardComponentProps): React.JSX.Element {
  return (
    <div className={NEUMORPHIC_CARD}>
      <div className="flex items-center gap-4">
        <div className={cn(ICON_CONTAINER, stat.color)}>
          <Icon path={stat.iconPath} className="text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
          <p className="text-sm text-text-secondary">{stat.label}</p>
        </div>
      </div>
    </div>
  );
}

interface ActivityItemComponentProps {
  activity: ActivityItem;
}

function ActivityItemComponent({
  activity,
}: ActivityItemComponentProps): React.JSX.Element {
  return (
    <div className={cn("flex items-start gap-4 p-4 rounded-xl", NEUMORPHIC_INSET)}>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon path={ACTIVITY_ICONS[activity.type]} size="md" className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-text-primary">{activity.title}</p>
        <p className="text-sm text-text-secondary truncate">{activity.description}</p>
      </div>
      <span className="text-xs text-text-secondary whitespace-nowrap">{activity.time}</span>
    </div>
  );
}

export default function ClientDashboardPage(): React.JSX.Element {
  const user = useAuthStore((state) => state.user);
  const { setMode } = useModeStore();

  // Set client mode only on initial mount, not on every mode change
  useEffect(() => {
    setMode("client");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome back, {user?.username || "Client"}!
        </h1>
        <p className="text-text-secondary mt-1">
          Manage your offers and find the perfect freelancers for your projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuickAction
          href="/app/client/offers/new"
          iconPath={ICON_PATHS.plus}
          iconColor="bg-primary"
          title="Create Offer"
          description="Post a new job for freelancers"
        />
        <QuickAction
          href="/marketplace"
          iconPath={ICON_PATHS.search}
          iconColor="bg-secondary"
          title="View Marketplace"
          description="Browse available freelancers"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat) => (
          <StatCardComponent key={stat.label} stat={stat} />
        ))}
      </div>

      <div className={NEUMORPHIC_CARD}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
          <button className="text-sm text-primary hover:text-primary-hover transition-colors cursor-pointer">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {MOCK_ACTIVITY.map((activity) => (
            <ActivityItemComponent key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
