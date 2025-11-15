export interface RatingProps {
    value?: number;
    max?: number;
    className?: string;
    size?: "sm" | "md" | "lg";
    onSelect?: (value: number) => void;
}
