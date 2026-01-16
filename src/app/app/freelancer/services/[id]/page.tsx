"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Icon, ICON_PATHS } from "@/components/ui/Icon";
import { NEUMORPHIC_CARD, PRIMARY_BUTTON, ICON_BUTTON } from "@/lib/styles";
import { MOCK_SERVICES, SERVICE_CATEGORIES } from "@/data/service.data";
import type { Service } from "@/types/service.types";

interface PageProps {
    params: Promise<{ id: string }>;
}

function getCategoryLabel(value: string): string {
    return SERVICE_CATEGORIES.find((c) => c.value === value)?.label || value;
}

export default function ServiceDetailsPage({ params }: PageProps): React.JSX.Element {
    // Unwrap params using React.use()
    const { id } = use(params);

    const router = useRouter();
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        // Simulate fetching
        const found = MOCK_SERVICES.find((s) => s.id === id);
        if (found) {
            setService(found);
        }
    }, [id]);

    if (!service) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-secondary">
                <Icon path={ICON_PATHS.briefcase} size="xl" className="mb-4 opacity-50" />
                <p>Service not found</p>
                <Link href="/app/freelancer/services" className="text-primary mt-2 hover:underline">
                    Back to Services
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/app/freelancer/services" className={ICON_BUTTON}>
                    <Icon path={ICON_PATHS.chevronLeft} size="md" className="text-text-primary" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-text-primary">Service Details</h1>
                    <p className="text-text-secondary text-sm">
                        View and manage your service
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className={cn(
                            "p-2 rounded-xl border border-error/50 text-error hover:bg-error/10 transition-colors"
                        )}
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this service?")) {
                                router.push("/app/freelancer/services");
                            }
                        }}
                    >
                        <Icon path={ICON_PATHS.trash} size="md" />
                    </button>
                    <Link
                        href={`/app/freelancer/services/${service.id}/edit`}
                        className={cn(PRIMARY_BUTTON, "flex items-center gap-2")}
                    >
                        <Icon path={ICON_PATHS.edit} size="sm" />
                        Edit Service
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className={cn(NEUMORPHIC_CARD, "p-8 space-y-8")}>
                {/* Title & Status */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary mb-2">{service.title}</h2>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-text-secondary border border-border-light">
                                {getCategoryLabel(service.category)}
                            </span>
                            <span
                                className={cn(
                                    "px-3 py-1 rounded-full text-sm font-medium",
                                    service.status === "active" ? "bg-success/20 text-success" :
                                        service.status === "paused" ? "bg-warning/20 text-warning" :
                                            "bg-text-secondary/20 text-text-secondary"
                                )}
                            >
                                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-primary">${service.price}</div>
                        <div className="text-text-secondary text-sm">per order</div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 border-y border-border-light py-6">
                    <div className="flex flex-col items-center justify-center border-r border-border-light">
                        <div className="flex items-center gap-2 text-text-primary font-bold text-xl">
                            <Icon path={ICON_PATHS.star} size="md" className="text-warning" />
                            {service.rating}
                        </div>
                        <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mt-1">Rating</div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-r border-border-light">
                        <div className="flex items-center gap-2 text-text-primary font-bold text-xl">
                            <Icon path={ICON_PATHS.briefcase} size="md" className="text-primary" />
                            {service.orders}
                        </div>
                        <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mt-1">Orders</div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-2 text-text-primary font-bold text-xl">
                            <Icon path={ICON_PATHS.clock} size="md" className="text-text-secondary" />
                            {service.deliveryDays}d
                        </div>
                        <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mt-1">Delivery</div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <h3 className="text-lg font-bold text-text-primary mb-3">Description</h3>
                    <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {service.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
