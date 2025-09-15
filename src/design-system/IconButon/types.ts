import type { LucideIcon } from "lucide-react";
import { type To } from "react-router-dom";

export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconButtonShape = "rounded" | "circle";
export type IconButtonColor = "primary" | "secondary" | "danger" | "success";
export type IconButtonVariant = "contained" | "outlined" | "borderless";
export type RenderAsLink = boolean;

interface IconButtonBaseProps {
    icon: LucideIcon;
    size?: IconButtonSize;
    shape?: IconButtonShape;
    color?: IconButtonColor;
    variant?: IconButtonVariant;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

export type IconButtonProps =
    | (IconButtonBaseProps & { renderAsLink: RenderAsLink; navigateTo: To })
    | (IconButtonBaseProps & { renderAsLink?: never; navigateTo?: never });
