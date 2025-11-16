import React from "react";
import { Navigate } from "react-router-dom";

import { LoadingScreen } from "../app/components/LoadingScreen";
import { useGetMe } from "../app/hooks/user/useGetMe";
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
    const { isLoading } = useGetMe();
    const { getEffectiveUser, isProfileLoading } = useUserStore();
    const effectiveUser = getEffectiveUser();

    // Only show loading if we're checking authentication and still loading
    if (redirectIfAuthenticated && (isLoading || isProfileLoading)) {
        return <LoadingScreen />;
    }

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
