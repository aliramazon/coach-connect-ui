import type { LucideIcon } from "lucide-react";

export type InputType = "text" | "email" | "password" | "tel" | "textarea";
export type InputShape = "rounded" | "circle";
export type InputSize = "sm" | "md" | "lg";

export type BaseInputProps = {
    type?: InputType;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    error?: boolean;
    shape?: InputShape;
    size?: InputSize;
    hintMessage?: string;

    clearable?: boolean;
    icon?: LucideIcon;

    onChange: (value: string) => void;
    value: string;
    autoFocus?: boolean;
};

type WithLabel = {
    label: string;
    id: string;
};

type WithoutLabel = {
    label?: string;
    id?: string;
};

export type InputProps = BaseInputProps & (WithLabel | WithoutLabel);
