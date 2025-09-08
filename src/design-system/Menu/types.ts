import { type IconName } from "../Icon";

export interface MenuOption {
    label: string;
    iconName?: IconName;
    value: string;
    color?: "primary" | "danger";
}

export interface MenuProps {
    options: MenuOption[];
    onSelect: (value: string) => void;
    customTrigger?: React.ReactNode;
    className?: string;
}
