import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import { userService } from "../services/user";

import { useUserStore } from "../store/useUserStore";
import { ApiError } from "../utils/api-error";

const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];

export const useGetMe = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setUser, setCsrfToken, setImpersonatedUser, logout } =
        useUserStore();

    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        setError(null);

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

                        const isPublicRoute = PUBLIC_ROUTES.includes(
                            location.pathname
                        );

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
            });
    }, []);

    return {
        isLoading,
        error,
    };
};
