export type RadioShape = "rounded" | "circle";

export interface RadioProps {
    checked: boolean;
    id: string;
    name: string;
    value: string;
    label?: string;
    onChange: (value: string) => void;
    shape?: RadioShape;
    className?: string;
    disabled?: boolean;
    position?: "end";
}
