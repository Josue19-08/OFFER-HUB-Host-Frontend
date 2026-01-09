import { cn } from "@/lib/cn";

export const NEUMORPHIC_CARD = cn(
  "p-6 rounded-2xl",
  "bg-white",
  "shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]"
);

export const NEUMORPHIC_BUTTON = cn(
  "flex items-center gap-3 px-6 py-4 rounded-xl",
  "bg-white",
  "shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
  "hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]",
  "active:shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]",
  "transition-all duration-200"
);

export const NEUMORPHIC_INSET = cn(
  "bg-background",
  "shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
);

export const NEUMORPHIC_INPUT = cn(
  "w-full px-4 py-3 rounded-xl",
  "bg-background",
  "shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]",
  "text-text-primary placeholder-text-secondary",
  "outline-none focus:ring-2 focus:ring-primary/20",
  "transition-all duration-200"
);

export const ICON_BUTTON = cn(
  "w-10 h-10 rounded-xl flex items-center justify-center",
  "bg-white",
  "shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
  "hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]",
  "transition-all duration-200"
);

export const ICON_CONTAINER = "w-12 h-12 rounded-xl flex items-center justify-center";
