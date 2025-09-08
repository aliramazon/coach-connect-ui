import { type To } from "react-router-dom";
import { type IconName } from "../Icon";

export type IconButtonSize = "sm" | "md" | "lg" | "xlg";
export type IconButtonShape = "rounded" | "circle";
export type IconButtonColor = "primary" | "secondary" | "danger" | "success";
export type IconButtonVariant = "contained" | "outlined" | "borderless";
export type RenderAsLink = boolean;

interface IconButtonBaseProps {
    iconName: IconName;
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
