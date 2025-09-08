export type CheckboxShape = "rounded" | "circle";

export interface CheckboxProps {
    checked: boolean;
    id: string;
    label?: string;
    onChange: (value: boolean) => void;
    shape?: CheckboxShape;
    className?: string;
    indeterminate?: boolean;
    disabled?: boolean;
    position?: "end";
}
