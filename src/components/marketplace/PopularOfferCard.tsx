"use client";

import Image from "next/image";
import type { Offer } from "@/types/marketplace.types";
import { cn } from "@/lib/cn";

interface PopularOfferCardProps {
  offer: Offer;
  onClick?: () => void;
}

export function PopularOfferCard({ offer, onClick }: PopularOfferCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-2xl bg-white cursor-pointer",
        "shadow-[var(--shadow-neumorphic-light)]",
        "hover:scale-[1.02] transition-all duration-300",
        "flex flex-col gap-3"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={offer.company.logo}
            alt={offer.company.name}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span className="text-sm text-text-secondary">{offer.company.name}</span>
        </div>
        <button
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            offer.isBookmarked
              ? "text-text-primary"
              : "text-text-secondary/40 hover:text-text-secondary"
          )}
          aria-label={offer.isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <svg className="h-5 w-5" fill={offer.isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-text-primary">{offer.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-text-secondary">{offer.rating}</span>
          </div>
          <span className="text-text-secondary/40">•</span>
          <span className="text-sm text-text-secondary">{offer.location}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary" />
          {offer.postedAt}
        </span>
        <span className="text-text-secondary/40">-</span>
        <span>{offer.applicants} Applied</span>
      </div>
    </div>
  );
}
