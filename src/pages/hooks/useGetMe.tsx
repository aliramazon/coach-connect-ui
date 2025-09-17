import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userService } from "../../services/user";
import { useUserStore } from "../store/useUserStore";

export const useGetMe = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setUser, setCsrfToken, setImpersonatedUser } = useUserStore();

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
            .catch((error: Error) => {
                toast.error(error.message);
                setError(error.message);
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
