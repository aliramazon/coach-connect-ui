import React from "react";
import { Navigate } from "react-router-dom";

import { LoadingScreen } from "../app/components/LoadingScreen";
import { useUserStore } from "../app/store/useUserStore";
import { UserRole } from "../app/types/roles";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
    redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles,
    redirectTo = "/login",
}) => {
    const { user, impersonatedUser, isProfileLoading } = useUserStore();

    const effectiveUser = impersonatedUser || user;
    console.log(isProfileLoading);
    if (isProfileLoading) return <LoadingScreen />;

    if (!effectiveUser) {
        return <Navigate to={redirectTo} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const hasRequiredRole = allowedRoles.includes(effectiveUser.role);
        if (!hasRequiredRole) {
            const dashboardMap = {
                [UserRole.ADMIN]: "/admin",
                [UserRole.COACH]: "/coach",
                [UserRole.STUDENT]: "/student",
            };
            return (
                <Navigate
                    to={dashboardMap[effectiveUser.role] || "/"}
                    replace
                />
            );
        }
    }

    return <>{children}</>;
};
