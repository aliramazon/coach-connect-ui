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
import { useLogout } from "../hooks/auth/useLogout";
import { useUserStore } from "../store/useUserStore";
import { UserRole } from "../types/roles";
import { ImpersonationModal } from "./ImpersonationModal";
import { AppLayout, AppPage } from "./Layout";
import { SideBarUser } from "./SidebarUser";
import { StopImpersonationModal } from "./StopImpersonationModal";

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
    const [isImpersonationModalOpen, setIsImpersonationModalOpen] =
        useState(false);
    const [isStopImpersonationModalOpen, setIsStopImpersonationModalOpen] =
        useState(false);

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
                        linkText: "Impersonate as",
                        icon: UserCog,
                        onClick: () => setIsImpersonationModalOpen(true),
                    },
                ],
            },
        ];
    }

    if (isImpersonating) {
        links[1].links.push({
            linkText: "Stop impersonation",
            icon: UserX,
            onClick: () => setIsStopImpersonationModalOpen(true),
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
                <ImpersonationModal
                    show={isImpersonationModalOpen}
                    onClose={() => {
                        setIsImpersonationModalOpen(false);
                    }}
                />
            )}
            {canImpersonate && (
                <StopImpersonationModal
                    show={isStopImpersonationModalOpen}
                    onClose={() => setIsStopImpersonationModalOpen(false)}
                />
            )}
            <Toaster />
        </>
    );
};
