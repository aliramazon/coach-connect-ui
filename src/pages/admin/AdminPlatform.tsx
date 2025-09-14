import { CalendarClock, GraduationCap, Users } from "lucide-react";
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
                linkText: "Students",
                linkTo: "students",
                icon: GraduationCap,
            },
            {
                linkText: "Coaches",
                linkTo: "coaches",
                icon: Users,
            },
        ],
    },
];

export const AdminPlatform: React.FC = () => {
    const { isLoading, error, user } = useGetMe();

    const logOut = () => {
        console.log("Log out");
    };

    // if (error) {
    //     return <div>Error</div>;
    // }

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
                    <SideBarLinks links={links} logOut={logOut} />
                </SideBar>
                <AppPage>
                    <Outlet />
                </AppPage>
            </AppLayout>
            <Toaster />
        </>
    );
};
