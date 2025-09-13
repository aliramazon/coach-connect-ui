import { CalendarClock, CalendarDays } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import {
    SideBar,
    SideBarLinks,
    type SideBarLinksGroup,
} from "../../design-system";
import { AppLayout, AppPage } from "../components/Layout";
import { SideBarUser } from "../components/SidebarUser";

const links: SideBarLinksGroup[] = [
    {
        title: "Manage",
        links: [
            {
                linkText: "Availability",
                linkTo: "availability",
                icon: CalendarDays,
            },
            {
                linkText: "Bookings",
                linkTo: "bookings",
                icon: CalendarClock,
            },
        ],
    },
];

export const CoachPlatform: React.FC = () => {
    const user = {
        firstName: "Ali",
        lastName: "Ramazon",
        email: "user@example.com",
    };

    const logOut = () => {
        console.log("Log out");
    };
    return (
        <AppLayout>
            <SideBar>
                <SideBarUser
                    details={{
                        firstName: user?.firstName || "",
                        lastName: user?.lastName || "",
                        email: user?.email || "",
                    }}
                />
                <SideBarLinks links={links} logOut={logOut} />
            </SideBar>
            <AppPage>
                <Outlet />
            </AppPage>
        </AppLayout>
    );
};
