"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  fallback?: ReactNode;
}

/**
 * LazySection - Lazy loads content when it enters the viewport
 *
 * Uses Intersection Observer for efficient below-the-fold content loading.
 * Great for improving initial page load performance.
 */
export function LazySection({
  children,
  className,
  rootMargin = "100px",
  threshold = 0,
  fallback,
}: LazySectionProps): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // If IntersectionObserver is not supported, render immediately
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      setHasLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={sectionRef} className={className}>
      {hasLoaded ? children : (isVisible ? children : (fallback || <LazySectionPlaceholder />))}
    </div>
  );
}

function LazySectionPlaceholder(): React.JSX.Element {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
