"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useModeStore } from "@/stores/mode-store";
import { useEffect } from "react";

interface OfferFormData {
  title: string;
  description: string;
  budget: string;
  category: string;
  deadline: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  budget?: string;
  category?: string;
  deadline?: string;
}

const CATEGORIES = [
  { value: "", label: "Select a category" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "design", label: "Design & Creative" },
  { value: "writing", label: "Writing & Translation" },
  { value: "marketing", label: "Marketing & Sales" },
  { value: "video", label: "Video & Animation" },
  { value: "music", label: "Music & Audio" },
  { value: "data", label: "Data & Analytics" },
  { value: "other", label: "Other" },
];

const INPUT_BASE_STYLES = cn(
  "w-full px-4 py-3 rounded-xl",
  "bg-background",
  "shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]",
  "text-text-primary placeholder-text-secondary",
  "outline-none focus:ring-2 focus:ring-primary/20",
  "transition-all duration-200"
);

const INPUT_ERROR_STYLES = "ring-2 ring-error/50";

const INITIAL_FORM_DATA: OfferFormData = {
  title: "",
  description: "",
  budget: "",
  category: "",
  deadline: "",
};

const MIN_TITLE_LENGTH = 10;
const MIN_DESCRIPTION_LENGTH = 50;
const MIN_BUDGET = 10;
const MOCK_API_DELAY = 1500;

function validateOfferForm(formData: OfferFormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.title.trim()) {
    errors.title = "Title is required";
  } else if (formData.title.length < MIN_TITLE_LENGTH) {
    errors.title = `Title must be at least ${MIN_TITLE_LENGTH} characters`;
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required";
  } else if (formData.description.length < MIN_DESCRIPTION_LENGTH) {
    errors.description = `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters`;
  }

  if (!formData.budget.trim()) {
    errors.budget = "Budget is required";
  } else {
    const budgetNum = parseFloat(formData.budget);
    if (isNaN(budgetNum) || budgetNum < MIN_BUDGET) {
      errors.budget = `Budget must be at least $${MIN_BUDGET}`;
    }
  }

  if (!formData.category) {
    errors.category = "Please select a category";
  }

  if (!formData.deadline) {
    errors.deadline = "Deadline is required";
  } else {
    const deadlineDate = new Date(formData.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (deadlineDate < today) {
      errors.deadline = "Deadline must be in the future";
    }
  }

  return errors;
}

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, error, children }: FormFieldProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}

export default function CreateOfferPage(): React.JSX.Element {
  const router = useRouter();
  const { mode, setMode } = useModeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<OfferFormData>(INITIAL_FORM_DATA);

  useEffect(() => {
    if (mode !== "client") {
      setMode("client");
    }
  }, [mode, setMode]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    const validationErrors = validateOfferForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));
    setIsLoading(false);

    // Redirect to offers list (or dashboard for now)
    router.push("/app/client/dashboard");
  }

  // Get minimum date for deadline (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/app/client/dashboard"
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            "bg-white",
            "shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
            "hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]",
            "transition-all duration-200"
          )}
        >
          <svg
            className="w-5 h-5 text-text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Create New Offer</h1>
          <p className="text-text-secondary mt-1">
            Post a job opportunity for freelancers
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div
        className={cn(
          "p-6 rounded-2xl",
          "bg-white",
          "shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]"
        )}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <FormField label="Offer Title" error={errors.title}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={cn(INPUT_BASE_STYLES, errors.title && INPUT_ERROR_STYLES)}
              placeholder="e.g., Build a responsive website for my business"
            />
          </FormField>

          {/* Category */}
          <FormField label="Category" error={errors.category}>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={cn(
                INPUT_BASE_STYLES,
                "cursor-pointer",
                errors.category && INPUT_ERROR_STYLES
              )}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </FormField>

          {/* Description */}
          <FormField label="Description" error={errors.description}>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className={cn(
                INPUT_BASE_STYLES,
                "resize-none",
                errors.description && INPUT_ERROR_STYLES
              )}
              placeholder="Describe your project in detail. Include requirements, deliverables, and any specific skills needed..."
            />
            <p className="mt-1 text-xs text-text-secondary">
              {formData.description.length} / {MIN_DESCRIPTION_LENGTH} minimum characters
            </p>
          </FormField>

          {/* Budget and Deadline Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Budget */}
            <FormField label="Budget (USD)" error={errors.budget}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                  $
                </span>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  min={MIN_BUDGET}
                  step="1"
                  className={cn(
                    INPUT_BASE_STYLES,
                    "pl-8",
                    errors.budget && INPUT_ERROR_STYLES
                  )}
                  placeholder="500"
                />
              </div>
            </FormField>

            {/* Deadline */}
            <FormField label="Deadline" error={errors.deadline}>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                min={today}
                className={cn(
                  INPUT_BASE_STYLES,
                  "cursor-pointer",
                  errors.deadline && INPUT_ERROR_STYLES
                )}
              />
            </FormField>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/app/client/dashboard"
              className={cn(
                "px-6 py-3 rounded-xl font-medium",
                "text-text-secondary",
                "hover:text-text-primary",
                "transition-colors duration-200"
              )}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "px-6 py-3 rounded-xl font-medium",
                "bg-primary text-white",
                "shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
                "hover:bg-primary-hover hover:shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff] hover:scale-[1.02]",
                "active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)] active:scale-[0.98]",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
                "transition-all duration-200 cursor-pointer"
              )}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Publishing...
                </span>
              ) : (
                "Publish Offer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
