import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";
import { useUserStore } from "../store/useUserStore";

export const useLogout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { logout: clearUserStore } = useUserStore();
    const navigate = useNavigate();

    const logout = () => {
        navigate("/login");
        setIsLoggingOut(true);
        setError(null);

        userService
            .logout()
            .then(() => {
                clearUserStore();
                navigate("/login");
            })
            .catch((error: Error) => {
                setError(error.message);
                clearUserStore();
                navigate("/login");
            })
            .finally(() => {
                setIsLoggingOut(false);
            });
    };

    return {
        logout,
        isLoggingOut,
        error,
    };
};
