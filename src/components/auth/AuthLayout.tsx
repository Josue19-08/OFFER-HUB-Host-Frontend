"use client";

import Link from "next/link";
import { Logo } from "@/components/ui";
import { cn } from "@/lib/cn";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-6">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </header>

      {/* Wave Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ minHeight: "40vh" }}
        >
          <path
            fill="#DEEFE7"
            fillOpacity="0.5"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="#15949C"
            fillOpacity="0.3"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="#149A9B"
            fillOpacity="0.2"
            d="M0,288L48,277.3C96,267,192,245,288,250.7C384,256,480,288,576,282.7C672,277,768,235,864,224C960,213,1056,235,1152,245.3C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Content */}
      <main className="relative z-10 flex items-center justify-center h-full px-4">
        <div
          className={cn(
            "w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white",
            "shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]",
            "opacity-0 animate-scale-in",
            "max-h-[90vh] overflow-y-auto scrollbar-hide"
          )}
          style={{ animationFillMode: "forwards" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
