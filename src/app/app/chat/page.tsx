"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { Icon, ICON_PATHS } from "@/components/ui/Icon";
import { ConversationList } from "@/components/chat/ConversationList";
import { MOCK_CONVERSATIONS } from "@/data/chat.data";
import { useSidebarStore } from "@/stores/sidebar-store";

export default function ChatPage() {
  const { setCollapsed } = useSidebarStore();

  // Auto-collapse sidebar when entering chat
  useEffect(() => {
    setCollapsed(true);
  }, [setCollapsed]);

  return (
    <div className="flex h-full gap-4">
      {/* Conversation List */}
      <div
        className={cn(
          "w-full sm:w-80 lg:w-[340px] flex-shrink-0",
          "rounded-2xl overflow-hidden",
          "shadow-[6px_6px_12px_#0a0f1a,-6px_-6px_12px_#1e2a4a]"
        )}
      >
        <ConversationList conversations={MOCK_CONVERSATIONS} />
      </div>

      {/* Empty State - Select Conversation */}
      <div
        className={cn(
          "hidden sm:flex flex-1 flex-col items-center justify-center",
          "rounded-2xl",
          "bg-secondary",
          "shadow-[6px_6px_12px_#0a0f1a,-6px_-6px_12px_#1e2a4a]"
        )}
      >
        <div
          className={cn(
            "w-24 h-24 mb-6 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-primary/20 to-accent/20",
            "ring-4 ring-primary/10"
          )}
        >
          <Icon path={ICON_PATHS.chat} size="xl" className="text-primary" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          Your Messages
        </h2>
        <p className="text-text-secondary text-center max-w-xs text-sm">
          Select a conversation from the list to start messaging
        </p>
      </div>
    </div>
  );
}
