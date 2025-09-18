import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { userService } from "../services/user";
import { useUserStore } from "../store/useUserStore";
import { UserRole } from "../types/roles";

interface UseImpersonateProps {
    onSuccessImpersonation?: () => void;
    onSuccessStop?: () => void;
}

export const useImpersonate = ({
    onSuccessImpersonation,
    onSuccessStop,
}: UseImpersonateProps = {}) => {
    const [impersonationError, setImpersonationError] = useState("");
    const [isImpersonating, setIsImpersonating] = useState(false);
    const [isStoppingImpersonation, setIsStoppingImpersonation] =
        useState(false);
    const { setImpersonatedUser, clearImpersonatedUser, impersonatedUser } =
        useUserStore();

    const navigate = useNavigate();

    const startImpersonation = async (userId: string) => {
        if (!userId.trim()) {
            setImpersonationError("User ID is required");
            return;
        }

        if (userId === impersonatedUser?.id) {
            return;
        }

        setIsImpersonating(true);
        setImpersonationError("");

        userService
            .impersonateUser(userId)
            .then((response) => {
                setImpersonatedUser(response.data.user);

                if (response.data.user.role !== impersonatedUser?.role) {
                    navigate(`/${response.data.user.role.toLowerCase()}`);
                }

                toast.success(
                    `Now impersonating ${response.data.user.firstName} ${response.data.user.lastName}`
                );
                onSuccessImpersonation?.();
            })
            .catch((error) => {
                toast.error(error.message);
                setImpersonationError(error.message);
            })
            .finally(() => {
                setIsImpersonating(false);
            });
    };

    const stopImpersonation = async () => {
        setIsStoppingImpersonation(true);

        userService
            .stopImpersonation()
            .then((response) => {
                clearImpersonatedUser();
                navigate(`/${UserRole.ADMIN.toLowerCase()}`);

                toast.success(response.message);
                onSuccessStop?.();
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsStoppingImpersonation(false);
            });
    };

    return {
        impersonationError,
        isImpersonating,
        isStoppingImpersonation,

        startImpersonation,
        stopImpersonation,
    };
};
