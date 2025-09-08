import { type IconName } from "../Icon";

type SideBarLink = {
    linkText: string;
    linkTo: string;
    iconName: IconName;
};

export type SideBarLinksGroup = {
    title: string;
    links: SideBarLink[];
};

export type SideBarLinksProps = {
    links: SideBarLinksGroup[];
    logOut: () => void;
};
