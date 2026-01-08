"use client";

import Image from "next/image";
import Link from "next/link";
import type { Freelancer } from "@/types/marketplace.types";
import { cn } from "@/lib/cn";

interface FreelancerCardProps {
  freelancer: Freelancer;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-white",
        "shadow-[var(--shadow-neumorphic-light)]",
        "hover:scale-[1.02] transition-all duration-300",
        "flex flex-col"
      )}
    >
      {/* Header with Avatar */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Image
            src={freelancer.avatar}
            alt={freelancer.name}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
          {freelancer.isAvailable && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary truncate">{freelancer.name}</h3>
          <p className="text-sm text-text-secondary truncate">{freelancer.title}</p>
        </div>
      </div>

      {/* Rating and Location */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-text-primary">{freelancer.rating}</span>
        </div>
        <span className="text-text-secondary/40">•</span>
        <span className="text-sm text-text-secondary truncate">{freelancer.location}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-medium text-text-secondary bg-background rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-light">
        <div>
          <span className="text-lg font-bold text-text-primary">${freelancer.hourlyRate}</span>
          <span className="text-sm text-text-secondary">/hr</span>
        </div>
        <Link
          href="/login"
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
            "bg-primary text-white",
            "hover:bg-primary-hover",
            "shadow-[var(--shadow-neumorphic-light)]",
            "active:shadow-[var(--shadow-neumorphic-inset-light)]"
          )}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
