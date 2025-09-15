import { CalendarClock, GraduationCap, UserCog, Users } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
    SideBar,
    SideBarLinks,
    Toaster,
    type SideBarLinksGroup,
} from "../../../design-system";
import { AppLayout, AppPage } from "../../components/Layout";
import { SideBarUser } from "../../components/SidebarUser";
import { useGetMe } from "../../hooks/useGetMe";
import { useLogout } from "../../hooks/useLogout";
import { LoginAsModal } from "./components/LoginAsModal";

export const AdminPlatform: React.FC = () => {
    const { isLoading, user } = useGetMe();
    const { logout } = useLogout();
    const [isLoginAsModalOpen, setIsLoginAsModalOpen] = useState(false);

    if (isLoading) {
        return null;
    }

    const showLoginAsModal = () => {
        setIsLoginAsModalOpen(true);
    };

    const closeLoginAsModal = () => {
        setIsLoginAsModalOpen(false);
    };
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
        {
            title: "Settings",
            links: [
                {
                    linkText: "Login As",
                    icon: UserCog,
                    onClick: showLoginAsModal,
                },
            ],
        },
    ];
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
            <LoginAsModal
                show={isLoginAsModalOpen}
                onClose={closeLoginAsModal}
            />
            <Toaster />
        </>
    );
};
