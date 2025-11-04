export type SeparatorOrientation = "horizontal" | "vertical";

export type SeparatorColor = "gray" | "light";

export interface SeparatorProps {
    orientation?: SeparatorOrientation;
    color?: SeparatorColor;
    className?: string;
}
