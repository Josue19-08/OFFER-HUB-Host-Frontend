"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon, ICON_PATHS, LoadingSpinner } from "@/components/ui/Icon";
import { FormField } from "@/components/ui/FormField";
import type { MarketplaceService } from "@/lib/api/marketplace";

export interface HireServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (requirements: string) => Promise<void>;
  service: MarketplaceService;
}

export function HireServiceModal({
  isOpen,
  onClose,
  onSubmit,
  service,
}: HireServiceModalProps): React.JSX.Element | null {
  const [requirements, setRequirements] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<{ requirements?: string; terms?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const price = parseFloat(service.price);
  const freelancerName = service.user?.firstName && service.user?.lastName
    ? `${service.user.firstName} ${service.user.lastName}`
    : service.user?.username || service.user?.email?.split("@")[0] || "Freelancer";

  function validate(): boolean {
    const newErrors: typeof errors = {};

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(requirements);
      setRequirements('');
      setAgreedToTerms(false);
      setErrors({});
    } catch (error) {
      console.error('Failed to hire service:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setRequirements('');
    setAgreedToTerms(false);
    setErrors({});
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div
        className={cn(
          "relative w-full max-w-lg animate-scale-in p-6 max-h-[90vh] overflow-y-auto",
          "rounded-3xl bg-white",
          "shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Hire Service</h2>
            <p className="text-sm text-text-secondary mt-1 line-clamp-2">{service.title}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
            aria-label="Close"
          >
            <Icon path={ICON_PATHS.close} size="md" />
          </button>
        </div>

        {/* Service Summary */}
        <div className={cn(
          "p-4 rounded-xl mb-6",
          "bg-background",
          "shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
        )}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Freelancer</span>
            <span className="text-sm font-medium text-text-primary">{freelancerName}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Price</span>
            <span className="text-lg font-bold text-primary">${price.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Delivery Time</span>
            <span className="text-sm font-medium text-text-primary">
              {service.deliveryDays} day{service.deliveryDays !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Project Requirements"
            hint="Describe what you need, any specific details, files, or references (optional)"
            optional
          >
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows={4}
              className={cn(
                "w-full px-4 py-3 rounded-xl resize-none bg-background",
                "shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]",
                "text-text-primary placeholder-text-secondary/50 focus:outline-none"
              )}
              placeholder="Please describe your specific requirements, timeline expectations, or any details the freelancer should know..."
            />
          </FormField>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-text-secondary">
              I understand that by hiring this service, an order will be created and I will need to fund the escrow to start the work.
            </label>
          </div>
          {errors.terms && (
            <p className="text-xs text-error">{errors.terms}</p>
          )}

          {/* Info Box */}
          <div className={cn(
            "flex items-start gap-3 p-4 rounded-xl",
            "bg-primary/5 border border-primary/20"
          )}>
            <Icon path={ICON_PATHS.infoCircle} size="md" className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-text-secondary">
              <p className="font-medium text-text-primary mb-1">What happens next?</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>An order will be created with status "Order Created"</li>
                <li>You'll need to reserve funds from your balance</li>
                <li>Create and fund the escrow to start the work</li>
                <li>Once completed, release payment to the freelancer</li>
              </ol>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className={cn(
                "flex-1 px-4 py-3 rounded-xl font-medium",
                "text-text-secondary hover:text-text-primary",
                "bg-background hover:bg-gray-100 transition-colors"
              )}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !agreedToTerms}
              className={cn(
                "flex-1 px-4 py-3 rounded-xl font-medium text-white",
                "bg-primary hover:bg-primary-hover transition-colors",
                "shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
                "disabled:opacity-70 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" className="text-white" />
                  <span>Creating Order...</span>
                </span>
              ) : (
                'Confirm & Create Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
