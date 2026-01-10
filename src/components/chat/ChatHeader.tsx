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
        "border-b border-border-light",
        "bg-white"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className={cn(
              "lg:hidden p-2 rounded-lg cursor-pointer",
              "text-text-secondary hover:text-text-primary",
              "hover:bg-background",
              "transition-all duration-200"
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
              "bg-gradient-to-br from-primary/20 to-accent/20",
              "shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff]"
            )}
          >
            <span className="text-sm font-semibold text-text-primary">
              {participant.avatar}
            </span>
          </div>
          {participant.isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Info */}
        <div>
          <h2 className="font-semibold text-text-primary">{participant.name}</h2>
          <p className="text-xs text-text-secondary">
            {participant.isOnline ? (
              <span className="text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
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
            "text-text-secondary hover:text-primary",
            "bg-background",
            "shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff]",
            "hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
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
            "text-text-secondary hover:text-primary",
            "bg-background",
            "shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff]",
            "hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
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
              "text-text-secondary hover:text-primary",
              "bg-background",
              "shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff]",
              "hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
              "transition-all duration-200",
              "hidden sm:flex"
            )}
            title="Chat info"
          >
            <Icon path={ICON_PATHS.user} size="md" />
          </button>
        )}
      </div>
    </div>
  );
}
