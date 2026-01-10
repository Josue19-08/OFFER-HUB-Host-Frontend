"use client";

import { cn } from "@/lib/cn";
import { Icon, ICON_PATHS } from "@/components/ui/Icon";
import type { ChatUser, SharedFile } from "@/types/chat.types";

interface ChatInfoPanelProps {
  participant: ChatUser;
  sharedFiles: SharedFile[];
  onClose?: () => void;
}

const FILE_ICONS: Record<SharedFile["type"], string> = {
  document: ICON_PATHS.document,
  image: ICON_PATHS.image,
  video: ICON_PATHS.video,
  other: ICON_PATHS.folder,
};

const FILE_COLORS: Record<SharedFile["type"], string> = {
  document: "text-blue-400",
  image: "text-green-400",
  video: "text-purple-400",
  other: "text-orange-400",
};

export function ChatInfoPanel({ participant, sharedFiles, onClose }: ChatInfoPanelProps) {
  return (
    <div className="flex flex-col h-full bg-secondary">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <h3 className="font-semibold text-white">Profile</h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "p-1.5 rounded-lg cursor-pointer",
              "text-text-secondary hover:text-white",
              "hover:bg-white/10",
              "transition-all duration-200"
            )}
          >
            <Icon path={ICON_PATHS.close} size="sm" />
          </button>
        )}
      </div>

      {/* Profile Section */}
      <div className="p-6 text-center border-b border-white/10">
        <div
          className={cn(
            "w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-primary/30 to-accent/30",
            "ring-4 ring-primary/20"
          )}
        >
          <span className="text-2xl font-bold text-white">
            {participant.avatar}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1">
          {participant.name}
        </h3>
        <p className="text-sm text-text-secondary mb-3">{participant.title}</p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
            participant.isOnline
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-white/5 text-text-secondary border border-white/10"
          )}
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              participant.isOnline ? "bg-green-400" : "bg-gray-500"
            )}
          />
          {participant.isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 p-4 border-b border-white/10">
        <div className={cn(
          "p-3 rounded-xl text-center",
          "bg-white/5 border border-white/10"
        )}>
          <p className="text-lg font-bold text-white">126</p>
          <p className="text-[10px] text-text-secondary uppercase tracking-wider">Messages</p>
        </div>
        <div className={cn(
          "p-3 rounded-xl text-center",
          "bg-white/5 border border-white/10"
        )}>
          <p className="text-lg font-bold text-white">24</p>
          <p className="text-[10px] text-text-secondary uppercase tracking-wider">Files</p>
        </div>
      </div>

      {/* Shared Files Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
          Shared Files
        </h4>
        <div className="space-y-2">
          {sharedFiles.map((file) => (
            <button
              key={file.id}
              type="button"
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl",
                "bg-white/5 border border-white/10",
                "hover:bg-white/10 hover:border-white/20",
                "transition-all duration-200 cursor-pointer",
                "text-left group"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  "bg-white/5 border border-white/10",
                  "group-hover:border-primary/30"
                )}
              >
                <Icon
                  path={FILE_ICONS[file.type]}
                  size="md"
                  className={FILE_COLORS[file.type]}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {file.count} files • {file.size}
                </p>
              </div>
              <Icon
                path={ICON_PATHS.chevronRight}
                size="sm"
                className="text-text-secondary group-hover:text-primary transition-colors"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl",
              "bg-white/5 border border-white/10 cursor-pointer",
              "hover:bg-white/10 hover:border-primary/30",
              "transition-all duration-200"
            )}
          >
            <Icon path={ICON_PATHS.link} size="md" className="text-primary" />
            <span className="text-[10px] text-text-secondary">Share</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl",
              "bg-white/5 border border-white/10 cursor-pointer",
              "hover:bg-white/10 hover:border-primary/30",
              "transition-all duration-200"
            )}
          >
            <Icon path={ICON_PATHS.bell} size="md" className="text-primary" />
            <span className="text-[10px] text-text-secondary">Mute</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl",
              "bg-white/5 border border-white/10 cursor-pointer",
              "hover:bg-red-500/10 hover:border-red-500/30",
              "transition-all duration-200 group"
            )}
          >
            <Icon path={ICON_PATHS.flag} size="md" className="text-red-400" />
            <span className="text-[10px] text-text-secondary group-hover:text-red-400">Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
