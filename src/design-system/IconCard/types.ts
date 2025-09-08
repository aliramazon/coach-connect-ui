import { type IconName } from "../Icon/types";

export type IconCardColor =
    | "green"
    | "sunglow"
    | "primary"
    | "red"
    | "blue"
    | "purple"
    | "green-light"
    | "sunglow-light"
    | "primary-light"
    | "red-light"
    | "blue-light"
    | "purple-light";

export type IconCardSize = "sm" | "md" | "lg";
export type IconCardShape = "rounded" | "circle";

export interface IconCardProps {
    color: IconCardColor;
    size: IconCardSize;
    iconName: IconName;
    shape: IconCardShape;
    className?: string;
}
