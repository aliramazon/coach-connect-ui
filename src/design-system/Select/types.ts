export type OptionValue = string | number;

export interface Option {
    value: OptionValue;
    label: string;
}

export type SelectSize = "md" | "lg";
export type SelectShape = "rounded" | "circle";

export interface SelectProps {
    options: Option[];
    value?: OptionValue;
    onSelect: (value: Option) => void;
    label?: string;
    headerPlaceholder?: string;
    size?: SelectSize;
    shape?: SelectShape;
    disabled?: true;
    error?: boolean;
    hintMessage?: string;
    searchable?: true;
    className?: string;
}
