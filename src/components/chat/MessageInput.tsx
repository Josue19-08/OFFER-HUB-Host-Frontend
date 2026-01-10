"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Icon, ICON_PATHS } from "@/components/ui/Icon";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 px-6 py-4",
        "border-t border-white/10",
        "bg-secondary"
      )}
    >
      {/* Attachment button */}
      <button
        type="button"
        className={cn(
          "p-2.5 rounded-xl cursor-pointer",
          "text-text-secondary hover:text-white",
          "bg-white/5 hover:bg-white/10",
          "border border-white/10",
          "transition-all duration-200",
          "hidden sm:flex"
        )}
        title="Attach file"
      >
        <Icon path={ICON_PATHS.paperclip} size="md" />
      </button>

      {/* Message input */}
      <div
        className={cn(
          "flex-1 flex items-center gap-3 px-4 py-3 rounded-xl",
          "bg-white/5 border border-white/10",
          "focus-within:border-primary/50 focus-within:bg-white/10",
          "transition-all duration-200"
        )}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={disabled}
          className={cn(
            "flex-1 bg-transparent text-sm text-white",
            "placeholder:text-text-secondary outline-none",
            disabled && "cursor-not-allowed opacity-50"
          )}
        />
        <button
          type="button"
          className="text-text-secondary hover:text-white transition-colors cursor-pointer hidden sm:block"
          title="Add emoji"
        >
          <Icon path={ICON_PATHS.emoji} size="md" />
        </button>
      </div>

      {/* Voice message button */}
      <button
        type="button"
        className={cn(
          "p-2.5 rounded-xl cursor-pointer",
          "text-text-secondary hover:text-white",
          "bg-white/5 hover:bg-white/10",
          "border border-white/10",
          "transition-all duration-200",
          "hidden sm:flex"
        )}
        title="Voice message"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </button>

      {/* Send button */}
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className={cn(
          "p-2.5 rounded-xl cursor-pointer",
          "transition-all duration-200",
          message.trim() && !disabled
            ? cn(
                "bg-primary text-white",
                "hover:bg-primary-hover",
                "shadow-[0_4px_12px_rgba(20,154,155,0.3)]"
              )
            : cn(
                "bg-white/5 text-text-secondary",
                "border border-white/10",
                "cursor-not-allowed"
              )
        )}
        title="Send message"
      >
        <Icon path={ICON_PATHS.send} size="md" />
      </button>
    </form>
  );
}
