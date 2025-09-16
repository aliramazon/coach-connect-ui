import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";

export const useImpersonate = () => {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const submit = async (userId: string) => {
        if (!userId.trim()) {
            setError("User ID is required");
            return;
        }

        setIsSubmitting(true);

        userService
            .impersonateUser(userId)
            .then((response) => {
                navigate(`/${response.data.role.toLowerCase()}`);
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
