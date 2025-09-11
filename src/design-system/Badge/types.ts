import type { LucideIcon } from "lucide-react";

export type BadgeColors = "primary" | "orange" | "green" | "red" | "gray";

type BadgeShape = "rounded" | "circle";

type BadgeVariant = "contained" | "outlined";

interface BadgePropsBase {
    label: string;
    color: BadgeColors;
    shape?: BadgeShape;
    variant?: BadgeVariant;
    status?: boolean;
    className?: string;
    icon?: LucideIcon;
}

type ExclusiveBadgeProps =
    | { status?: BadgePropsBase["status"]; icon?: never }
    | { icon?: BadgePropsBase["icon"]; status?: never };

export type BadgeProps = BadgePropsBase & ExclusiveBadgeProps;
