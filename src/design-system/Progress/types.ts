export type ProgressColor = "primary" | "orange" | "green" | "red";
export type LinearProgressSize = "md" | "lg";
export type LinearProgressShape = "rounded" | "sharp";

export interface LinearProgressProps {
    color?: ProgressColor;
    value: number;
    error?: boolean;
    shape?: LinearProgressShape;
    size?: LinearProgressSize;
    className?: string;
}

export interface LinearProgressIndicatorProps {
    error: boolean | undefined;
    value: number;
    shape: LinearProgressShape | undefined;
}
