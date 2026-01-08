"use client";

import { useRef, useState } from "react";
import type { Offer } from "@/types/marketplace.types";
import { PopularOfferCard } from "./PopularOfferCard";
import { cn } from "@/lib/cn";

interface PopularCarouselProps {
  offers: Offer[];
}

export function PopularCarousel({ offers }: PopularCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary">Popular</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={cn(
              "p-2 rounded-xl transition-all duration-200",
              "shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff]",
              "hover:shadow-[inset_3px_3px_6px_#d1d5db,inset_-3px_-3px_6px_#ffffff]",
              canScrollLeft
                ? "text-text-primary"
                : "text-text-secondary/30 cursor-not-allowed"
            )}
            aria-label="Scroll left"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={cn(
              "p-2 rounded-xl transition-all duration-200",
              "shadow-[3px_3px_6px_#d1d5db,-3px_-3px_6px_#ffffff]",
              "hover:shadow-[inset_3px_3px_6px_#d1d5db,inset_-3px_-3px_6px_#ffffff]",
              canScrollRight
                ? "text-text-primary"
                : "text-text-secondary/30 cursor-not-allowed"
            )}
            aria-label="Scroll right"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={checkScrollButtons}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {offers.map((offer) => (
          <div key={offer.id} className="flex-shrink-0 w-[280px]">
            <PopularOfferCard
              offer={offer}
              onClick={() => {
                console.log("Clicked offer:", offer.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
