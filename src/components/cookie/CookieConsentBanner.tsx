"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";

const COOKIE_CONSENT_KEY = "cookie-consent";
const COOKIE_CONSENT_VERSION = "1.0";

export type CookieConsent = {
  version: string;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;

    const consent = JSON.parse(stored) as CookieConsent;
    if (consent.version !== COOKIE_CONSENT_VERSION) return null;

    return consent;
  } catch {
    return null;
  }
}

function setCookieConsent(consent: Omit<CookieConsent, "version" | "timestamp">): void {
  const fullConsent: CookieConsent = {
    ...consent,
    version: COOKIE_CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(fullConsent));
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setConsent(getCookieConsent());
    setIsLoading(false);
  }, []);

  return { consent, isLoading };
}

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (!existingConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAcceptAll(): void {
    setCookieConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    setIsVisible(false);
  }

  function handleRejectAll(): void {
    setCookieConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setIsVisible(false);
  }

  function handleSavePreferences(): void {
    setCookieConsent({
      necessary: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6",
        "animate-slide-up"
      )}
    >
      <div
        className={cn(
          "max-w-4xl mx-auto p-6 rounded-2xl bg-white",
          "shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]",
          "border border-border-light"
        )}
      >
        {!showPreferences ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <h2
                  id="cookie-consent-title"
                  className="text-lg font-semibold text-text-primary mb-2"
                >
                  We Value Your Privacy
                </h2>
                <p
                  id="cookie-consent-description"
                  className="text-sm text-text-secondary leading-relaxed"
                >
                  We use cookies to enhance your browsing experience, analyze site traffic,
                  and personalize content. By clicking &quot;Accept All&quot;, you consent to our
                  use of cookies. Read our{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>{" "}
                  to learn more.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto"
              >
                Accept All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="w-full sm:w-auto"
              >
                Reject All
              </Button>
              <button
                onClick={() => setShowPreferences(true)}
                className="text-sm text-text-secondary hover:text-text-primary underline transition-colors"
              >
                Manage Preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Cookie Preferences
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-background">
                <div>
                  <h3 className="font-medium text-text-primary">Necessary Cookies</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 rounded accent-primary cursor-not-allowed"
                    aria-label="Necessary cookies (always enabled)"
                  />
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-background">
                <div>
                  <h3 className="font-medium text-text-primary">Analytics Cookies</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                    }
                    className="w-5 h-5 rounded accent-primary cursor-pointer"
                    aria-label="Analytics cookies"
                  />
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-background">
                <div>
                  <h3 className="font-medium text-text-primary">Marketing Cookies</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Used to track visitors across websites for advertising purposes.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                    }
                    className="w-5 h-5 rounded accent-primary cursor-pointer"
                    aria-label="Marketing cookies"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto"
              >
                Save Preferences
              </Button>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-sm text-text-secondary hover:text-text-primary underline transition-colors"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
