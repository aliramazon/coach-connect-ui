import type { LucideIcon } from "lucide-react";

type SideBarLink = {
    linkText: string;
    linkTo?: string;
    icon: LucideIcon;
    onClick?: () => void;
};

export type SideBarLinksGroup = {
    title: string;
    links: SideBarLink[];
};

export type SideBarLinksProps = {
    links: SideBarLinksGroup[];
    logOut: () => void;
};
