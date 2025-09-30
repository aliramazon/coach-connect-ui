import type { LucideIcon } from "lucide-react";
import React from "react";
import { type To } from "react-router-dom";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "rounded" | "circle";
export type ButtonColor = "primary" | "secondary" | "danger" | "success";
export type ButtonVariant = "contained" | "outlined" | "text";
export type RenderableAs = "link" | "navLink";

interface ButtonBaseProps {
    size?: ButtonSize;
    shape?: ButtonShape;
    fullWidth?: boolean;
    color?: ButtonColor;
    variant?: ButtonVariant;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
    startIcon?: LucideIcon;
    endIcon?: LucideIcon;
    onClick?: () => void;
    loading?: boolean;
}

export type ButtonProps =
    | (ButtonBaseProps & { renderAs: RenderableAs; navigateTo: To })
    | (ButtonBaseProps & { renderAs?: never; navigateTo?: never });
