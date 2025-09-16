import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";
import { useUserStore } from "../store/useUserStore";

export const useImpersonate = (onSuccess: () => void) => {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setImpersonatedUser, impersonatedUser } = useUserStore();

    const navigate = useNavigate();

    const submit = async (userId: string) => {
        if (!userId.trim()) {
            setError("User ID is required");
            return;
        }

        if (userId === impersonatedUser?.id) {
            return;
        }

        setIsSubmitting(true);

        userService
            .impersonateUser(userId)
            .then((response) => {
                setImpersonatedUser(response.data.user);

                if (response.data.user.role !== impersonatedUser?.role) {
                    navigate(`/${response.data.user.role.toLowerCase()}`);
                }
                onSuccess();
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return {
        error,
        isSubmitting,
        submit,
    };
};
