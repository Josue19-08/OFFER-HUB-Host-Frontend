"use client";

import { cn } from "@/lib/cn";
import { Icon, ICON_PATHS } from "@/components/ui/Icon";
import type { ChatUser } from "@/types/chat.types";

interface ChatHeaderProps {
  participant: ChatUser;
  onToggleSidebar?: () => void;
  onToggleInfo?: () => void;
  showInfoButton?: boolean;
}

export function ChatHeader({
  participant,
  onToggleSidebar,
  onToggleInfo,
  showInfoButton = true,
}: ChatHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4",
        "border-b border-white/10",
        "bg-secondary"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className={cn(
              "lg:hidden p-2 rounded-lg",
              "text-text-secondary hover:text-white",
              "hover:bg-white/10",
              "transition-all duration-200 cursor-pointer"
            )}
          >
            <Icon path={ICON_PATHS.menu} size="md" />
          </button>
        )}

        {/* Avatar */}
        <div className="relative">
          <div
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-primary/30 to-accent/30",
              "ring-2 ring-primary/30"
            )}
          >
            <span className="text-sm font-semibold text-white">
              {participant.avatar}
            </span>
          </div>
          {participant.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-secondary rounded-full" />
          )}
        </div>

        {/* Info */}
        <div>
          <h2 className="font-semibold text-white">{participant.name}</h2>
          <p className="text-xs text-text-secondary">
            {participant.isOnline ? (
              <span className="text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Active now
              </span>
            ) : (
              participant.title || "Offline"
            )}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={cn(
            "p-2.5 rounded-xl cursor-pointer",
            "text-text-secondary hover:text-white",
            "bg-white/5 hover:bg-white/10",
            "border border-white/10",
            "transition-all duration-200"
          )}
          title="Voice call"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button
          type="button"
          className={cn(
            "p-2.5 rounded-xl cursor-pointer",
            "text-text-secondary hover:text-white",
            "bg-white/5 hover:bg-white/10",
            "border border-white/10",
            "transition-all duration-200"
          )}
          title="Video call"
        >
          <Icon path={ICON_PATHS.video} size="md" />
        </button>
        {showInfoButton && onToggleInfo && (
          <button
            type="button"
            onClick={onToggleInfo}
            className={cn(
              "p-2.5 rounded-xl cursor-pointer",
              "text-text-secondary hover:text-white",
              "bg-white/5 hover:bg-white/10",
              "border border-white/10",
              "transition-all duration-200",
              "hidden sm:flex"
            )}
            title="Chat info"
          >
            <Icon path={ICON_PATHS.user} size="md" />
          </button>
        )}
        <button
          type="button"
          className={cn(
            "p-2.5 rounded-xl cursor-pointer",
            "text-text-secondary hover:text-white",
            "bg-white/5 hover:bg-white/10",
            "border border-white/10",
            "transition-all duration-200"
          )}
          title="More options"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
