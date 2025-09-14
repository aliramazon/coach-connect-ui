import { CalendarClock, CalendarCog } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import {
    SideBar,
    SideBarLinks,
    Toaster,
    type SideBarLinksGroup,
} from "../../design-system";
import { AppLayout, AppPage } from "../components/Layout";
import { SideBarUser } from "../components/SidebarUser";
import { useGetMe } from "../hooks/useGetMe";
import { useLogout } from "../hooks/useLogout";

const links: SideBarLinksGroup[] = [
    {
        title: "Manage",
        links: [
            {
                linkText: "Bookings",
                linkTo: "bookings",
                icon: CalendarClock,
            },
            {
                linkText: "Availability",
                linkTo: "availability",
                icon: CalendarCog,
            },
        ],
    },
];

export const CoachPlatform: React.FC = () => {
    const { isLoading, user } = useGetMe();
    const { logout } = useLogout();

    if (isLoading) {
        return null;
    }

    return (
        <>
            <AppLayout>
                <SideBar>
                    <SideBarUser
                        details={{
                            firstName: user?.firstName || "",
                            lastName: user?.lastName || "",
                            email: user?.email || "",
                        }}
                    />
                    <SideBarLinks links={links} logOut={logout} />
                </SideBar>
                <AppPage>
                    <Outlet />
                </AppPage>
            </AppLayout>
            <Toaster />
        </>
    );
};
