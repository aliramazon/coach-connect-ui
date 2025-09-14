import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userService } from "../../services/user";
import { useUser } from "../store/useUser";

export const useGetMe = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user, setUser, setCsrfToken } = useUser();

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        userService
            .getMe()
            .then((response) => {
                setUser(response.data);
                setCsrfToken(response.csrfToken);

                localStorage.setItem(
                    "userSession",
                    JSON.stringify({
                        role: response.data.role,
                        userId: response.data.id,
                        isImpersonating: response.isImpersonating,
                    })
                );
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
        user,
        isLoading,
        error,
    };
};
