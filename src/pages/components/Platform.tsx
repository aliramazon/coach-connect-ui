import {
    CalendarClock,
    CalendarCog,
    GraduationCap,
    UserCog,
    Users,
} from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
    SideBar,
    SideBarLinks,
    Toaster,
    type SideBarLinksGroup,
} from "../../design-system";
import { UserRole } from "../../types/roles";
import { AppLayout, AppPage } from "../components/Layout";
import { SideBarUser } from "../components/SidebarUser";
import { useGetMe } from "../hooks/useGetMe";
import { useLogout } from "../hooks/useLogout";
import { useUserStore } from "../store/useUserStore";
import { LoginAsModal } from "./LoginAsModal";

// central map of links per role
const roleLinks: Record<string, SideBarLinksGroup[]> = {
    admin: [
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
                { linkText: "Coaches", linkTo: "coaches", icon: Users },
            ],
        },
    ],
    coach: [
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
    ],
    student: [
        {
            title: "Manage",
            links: [
                {
                    linkText: "Bookings",
                    linkTo: "bookings",
                    icon: CalendarClock,
                },
                { linkText: "Coaches", linkTo: "coaches", icon: Users },
            ],
        },
    ],
};

export const Platform: React.FC = () => {
    const { isLoading } = useGetMe();
    const { user, impersonatedUser, isImpersonating } = useUserStore();
    const { logout } = useLogout();
    const [isLoginAsModalOpen, setIsLoginAsModalOpen] = useState(false);

    const effectiveUser = impersonatedUser || user;

    if (isLoading) return null;

    let links: SideBarLinksGroup[] = [];
    if (effectiveUser) {
        links = roleLinks[effectiveUser.role.toLowerCase()];
    }

    const canImpersonate = user?.role === UserRole.ADMIN || isImpersonating;

    if (canImpersonate) {
        links = [
            ...links,
            {
                title: "Settings",
                links: [
                    {
                        linkText: "Login As",
                        icon: UserCog,
                        onClick: () => setIsLoginAsModalOpen(true),
                    },
                ],
            },
        ];
    }

    return (
        <>
            <AppLayout>
                <SideBar>
                    <SideBarUser
                        details={{
                            firstName: effectiveUser?.firstName || "",
                            lastName: effectiveUser?.lastName || "",
                            email: effectiveUser?.email || "",
                        }}
                    />
                    <SideBarLinks links={links} logOut={logout} />
                </SideBar>
                <AppPage>
                    <Outlet />
                </AppPage>
            </AppLayout>
            {canImpersonate && (
                <LoginAsModal
                    show={isLoginAsModalOpen}
                    onClose={() => {
                        console.log("Close");
                        setIsLoginAsModalOpen(false);
                    }}
                />
            )}
            <Toaster />
        </>
    );
};
