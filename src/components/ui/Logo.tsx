import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

const sizeConfig = {
  sm: { width: 32, height: 32, iconClass: "h-8 w-8", textClass: "text-lg" },
  md: { width: 40, height: 40, iconClass: "h-10 w-10", textClass: "text-xl" },
  lg: { width: 48, height: 48, iconClass: "h-12 w-12", textClass: "text-2xl" },
};

export function Logo({ size = "md", className, showText = true }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <Image
        src="/OFFER-HUB-logo.png"
        alt="OFFER-HUB"
        width={config.width}
        height={config.height}
        priority
        className={cn("w-auto", config.iconClass)}
      />
      {showText && (
        <span className={cn("font-bold text-secondary", config.textClass)}>
          OFFER-HUB
        </span>
      )}
    </Link>
  );
}
