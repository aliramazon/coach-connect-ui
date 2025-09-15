export interface Option {
    value: unknown;
    label: string;
}

export type SelectSize = "md" | "lg";
export type SelectShape = "rounded" | "circle";

export interface SelectProps {
    options: Option[];
    value?: unknown;
    onSelect: (value: Option) => void;
    label?: string;
    headerPlaceholder?: string;
    size?: SelectSize;
    shape?: SelectShape;
    disabled?: boolean;
    error?: boolean;
    hintMessage?: string;
    searchable?: true;
    className?: string;
}
