"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Icon, ICON_PATHS } from "@/components/ui/Icon";
import type { Conversation } from "@/types/chat.types";

interface ConversationListProps {
  conversations: Conversation[];
  isCollapsed?: boolean;
  currentUserId?: string;
}

// Mock current user for the profile section
const CURRENT_USER = {
  name: "John Doe",
  avatar: "/mock-images/man1.png",
  status: "Available",
};

export function ConversationList({ conversations, isCollapsed = false, currentUserId }: ConversationListProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "groups">("all");

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" ||
      (activeFilter === "unread" && conv.unreadCount > 0);
    return matchesSearch && matchesFilter;
  });

  function isActiveConversation(id: string): boolean {
    return pathname === `/app/chat/${id}`;
  }

  // Collapsed view - just avatars
  if (isCollapsed) {
    return (
      <div className="flex flex-col h-full bg-secondary py-4">
        {/* Current user avatar */}
        <div className="flex justify-center mb-6 px-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary">
              <Image
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-secondary rounded-full" />
          </div>
        </div>

        {/* Divider */}
        <div className="mx-3 mb-4 border-t border-white/10" />

        {/* Conversation avatars */}
        <div className="flex-1 overflow-y-auto px-2 space-y-3">
          {conversations.slice(0, 8).map((conv) => (
            <Link
              key={conv.id}
              href={`/app/chat/${conv.id}`}
              className={cn(
                "relative flex justify-center",
                "group"
              )}
              title={conv.participant.name}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full overflow-hidden",
                  "transition-all duration-200",
                  "ring-2",
                  isActiveConversation(conv.id)
                    ? "ring-primary scale-110"
                    : "ring-transparent group-hover:ring-primary/50"
                )}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {conv.participant.avatar}
                  </span>
                </div>
              </div>
              {conv.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {conv.unreadCount}
                </span>
              )}
              {conv.participant.isOnline && (
                <span className="absolute bottom-0 right-1 w-2.5 h-2.5 bg-green-500 border-2 border-secondary rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="px-2 pt-4 space-y-3">
          <button
            type="button"
            className="w-full flex justify-center p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-white/5 transition-colors cursor-pointer"
            title="Settings"
          >
            <Icon path={ICON_PATHS.settings} size="md" />
          </button>
        </div>
      </div>
    );
  }

  // Full expanded view
  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Profile Section */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/50">
              <Image
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-secondary rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{CURRENT_USER.name}</h3>
            <p className="text-xs text-green-400">{CURRENT_USER.status}</p>
          </div>
          <button
            type="button"
            className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Icon path={ICON_PATHS.settings} size="sm" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2.5 rounded-xl",
            "bg-white/5 border border-white/10",
            "focus-within:border-primary/50 focus-within:bg-white/10",
            "transition-all duration-200"
          )}
        >
          <Icon path={ICON_PATHS.search} size="sm" className="text-text-secondary" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-text-secondary outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pb-3">
        <div className="flex gap-2">
          {(["all", "unread", "groups"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium capitalize",
                "transition-all duration-200 cursor-pointer",
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-2">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-text-secondary">
            <Icon path={ICON_PATHS.chat} size="lg" className="mb-2 opacity-50" />
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/app/chat/${conv.id}`}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl",
                  "transition-all duration-200",
                  isActiveConversation(conv.id)
                    ? "bg-primary/20 border border-primary/30"
                    : "hover:bg-white/5 border border-transparent"
                )}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      "bg-gradient-to-br from-primary/30 to-accent/30"
                    )}
                  >
                    <span className="text-sm font-semibold text-white">
                      {conv.participant.avatar}
                    </span>
                  </div>
                  {conv.participant.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-secondary rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className={cn(
                      "font-medium text-sm truncate",
                      conv.unreadCount > 0 ? "text-white" : "text-white/80"
                    )}>
                      {conv.participant.name}
                    </h3>
                    <span className="text-[11px] text-text-secondary flex-shrink-0 ml-2">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "text-xs truncate pr-2",
                      conv.unreadCount > 0 ? "text-white/70" : "text-text-secondary"
                    )}>
                      {conv.isTyping ? (
                        <span className="text-primary italic flex items-center gap-1">
                          <span className="flex gap-0.5">
                            <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </span>
                          typing...
                        </span>
                      ) : (
                        conv.lastMessage
                      )}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span
                        className={cn(
                          "flex-shrink-0 min-w-[20px] h-5 px-1.5",
                          "bg-primary text-white text-[10px] font-bold",
                          "rounded-full flex items-center justify-center"
                        )}
                      >
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* New Message Button */}
      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl",
            "bg-primary text-white font-medium text-sm",
            "hover:bg-primary-hover transition-colors cursor-pointer",
            "shadow-[0_4px_12px_rgba(20,154,155,0.3)]"
          )}
        >
          <Icon path={ICON_PATHS.plus} size="sm" />
          New Message
        </button>
      </div>
    </div>
  );
}
