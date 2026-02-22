"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import { Icon, ICON_PATHS, LoadingSpinner } from "@/components/ui/Icon";
import { FILE_UPLOAD } from "@/lib/validation";
import { ImageUploadProps } from "@/types/image-upload.types";

export function ImageUpload({
  variant,
  maxSize,
  allowedTypes = FILE_UPLOAD.ALLOWED_IMAGE_TYPES,
  currentImage,
  onUpload,
  onRemove,
  className,
  aspectRatio = "square",
  label,
  error: externalError,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const effectiveMaxSize =
    maxSize || (variant === "single" ? FILE_UPLOAD.PROFILE_MAX_SIZE : FILE_UPLOAD.MAX_SIZE);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (file.size > effectiveMaxSize) {
        return `File size exceeds ${effectiveMaxSize / (1024 * 1024)}MB limit`;
      }
      if (!allowedTypes.includes(file.type)) {
        return "File type not supported";
      }
      return null;
    },
    [effectiveMaxSize, allowedTypes]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setError(null);
      const newFiles: File[] = [];
      let validationError: string | null = null;

      if (variant === "single") {
        const file = files[0];
        validationError = validateFile(file);
        if (!validationError) {
          newFiles.push(file);
          const newPreview = URL.createObjectURL(file);
          setPreview(newPreview);
        }
      } else {
        Array.from(files).forEach((file) => {
          const err = validateFile(file);
          if (err) {
            validationError = err;
          } else {
            newFiles.push(file);
          }
        });
      }

      if (validationError) {
        setError(validationError);
      }

      if (newFiles.length > 0) {
        onUpload(newFiles);
      }
    },
    [variant, validateFile, onUpload]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderSingle = () => (
    <div className="flex flex-col items-center gap-4">
      {label && (
        <label className="block text-sm font-medium text-text-primary self-start">{label}</label>
      )}
      <div
        className="flex items-center gap-4 w-full"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-200",
            "bg-primary/5 border-2 border-dashed border-border-light",
            isDragging && "border-primary bg-primary/10",
            (error || externalError) && "border-error bg-error/5"
          )}
        >
          {preview ? (
            <img src={preview} alt="Profile preview" className="w-full h-full object-cover" />
          ) : (
            <Icon path={ICON_PATHS.user} size="xl" className="text-text-secondary" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
            <Icon path={ICON_PATHS.upload} size="md" className="text-white" />
          </div>
        </div>
        <div className="flex-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
              "bg-background text-text-primary shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]",
              "hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]",
              "active:shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
            )}
          >
            Change Photo
          </button>
          <p className="text-xs text-text-secondary mt-2">
            JPG, PNG or GIF. Max {effectiveMaxSize / (1024 * 1024)}MB.
          </p>
        </div>
      </div>
      {(error || externalError) && (
        <p className="text-sm text-error self-start">{error || externalError}</p>
      )}
    </div>
  );

  const renderMultiple = () => (
    <div className={cn("space-y-4", className)}>
      {label && <label className="block text-sm font-medium text-text-primary">{label}</label>}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "border-2 border-dashed border-border-light rounded-xl p-8",
          "flex flex-col items-center justify-center gap-3",
          "cursor-pointer transition-all duration-200",
          "hover:border-primary/50 hover:bg-primary/5",
          isDragging && "border-primary bg-primary/10",
          (error || externalError) && "border-error bg-error/5"
        )}
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon path={ICON_PATHS.image} size="lg" className="text-primary" />
        </div>
        <p className="text-sm text-text-primary font-medium">Click or drag to upload files</p>
        <p className="text-xs text-text-secondary">
          PNG, JPG, GIF up to {effectiveMaxSize / (1024 * 1024)}MB each
        </p>
      </div>
      {(error || externalError) && <p className="text-sm text-error">{error || externalError}</p>}
    </div>
  );

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple={variant === "multiple"}
        accept={allowedTypes.join(",")}
        onChange={onChange}
        className="hidden"
      />
      {variant === "single" ? renderSingle() : renderMultiple()}
    </>
  );
}
