import type { LucideIcon } from "lucide-react";

export interface MenuOption {
    label: string;
    icon?: LucideIcon;
    value: string;
    color?: "primary" | "danger";
}

export interface MenuProps {
    options: MenuOption[];
    onSelect: (value: string) => void;
    customTrigger?: React.ReactNode;
    className?: string;
}
