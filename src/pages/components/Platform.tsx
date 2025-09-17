import {
    CalendarClock,
    CalendarCog,
    GraduationCap,
    UserCog,
    Users,
    UserX,
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
import { useLogout } from "../hooks/useLogout";
import { useUserStore } from "../store/useUserStore";
import { LoginAsModal } from "./LoginAsModal";
import { StopLoginAsModal } from "./StopLoginAsModal";

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

export const Platform: React.FC<{ role: UserRole }> = ({ role }) => {
    const { user, impersonatedUser, isImpersonating } = useUserStore();
    const { logout } = useLogout();
    const [isLoginAsModalOpen, setIsLoginAsModalOpen] = useState(false);
    const [
        isStopLoginAsConfirmationModalOpen,
        setIsStopLoginAsConfirmationModalOpen,
    ] = useState(false);

    const effectiveUser = impersonatedUser || user;

    let links: SideBarLinksGroup[] = roleLinks[role.toLowerCase()];

    const canImpersonate = role === UserRole.ADMIN || isImpersonating;

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

    if (isImpersonating) {
        links[1].links.push({
            linkText: "Stop Login As",
            icon: UserX,
            onClick: () => setIsStopLoginAsConfirmationModalOpen(true),
        });
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
                        setIsLoginAsModalOpen(false);
                    }}
                />
            )}
            {canImpersonate && (
                <StopLoginAsModal
                    show={isStopLoginAsConfirmationModalOpen}
                    onClose={() => setIsStopLoginAsConfirmationModalOpen(false)}
                />
            )}
            <Toaster />
        </>
    );
};
