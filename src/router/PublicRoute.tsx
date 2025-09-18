import React from "react";
import { Navigate } from "react-router-dom";

import { useUserStore } from "../app/store/useUserStore";
import { UserRole } from "../app/types/roles";

interface PublicRouteProps {
    children: React.ReactNode;
    redirectIfAuthenticated?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
    children,
    redirectIfAuthenticated = true,
}) => {
    const { user, impersonatedUser } = useUserStore();
    const effectiveUser = impersonatedUser || user;

    if (redirectIfAuthenticated && effectiveUser) {
        const dashboardMap = {
            [UserRole.ADMIN]: "/admin",
            [UserRole.COACH]: "/coach",
            [UserRole.STUDENT]: "/student",
        };
        return (
            <Navigate to={dashboardMap[effectiveUser.role] || "/"} replace />
        );
    }

    return <>{children}</>;
};
