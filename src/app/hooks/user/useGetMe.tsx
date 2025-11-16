import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import { userService } from "../../services/user";

import { useUserStore } from "../../store/useUserStore";
import { ApiError } from "../../utils/api-error";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/forgot-password"];

export const useGetMe = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const {
        setUser,
        setCsrfToken,
        setImpersonatedUser,
        logout,
        setIsProfileLoading,
        user,
    } = useUserStore();

    useEffect(() => {
        // Only fetch if user is not already loaded
        if (user) {
            setIsLoading(false);
            setIsProfileLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

        userService
            .getMe()
            .then((response) => {
                if (
                    response.isImpersonating &&
                    response.data.impersonatedUser
                ) {
                    setImpersonatedUser(response.data.impersonatedUser);
                    setUser(response.data.user);
                } else {
                    setUser(response.data.user);
                }

                setCsrfToken(response.csrfToken);
            })
            .catch((err: unknown) => {
                if (err instanceof ApiError) {
                    if (err.errorCode === "AUTHENTICATION_ERROR") {
                        logout();

                        // Only show toast if not on a public route
                        if (!isPublicRoute) {
                            toast.error(
                                "Session expired, please log in again."
                            );
                        }
                    } else {
                        toast.error(err.message);
                        setError(err.message);
                    }
                } else if (err instanceof Error) {
                    toast.error(err.message);
                    setError(err.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
                setIsProfileLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount, user check is inside

    return {
        isLoading,
        error,
    };
};
