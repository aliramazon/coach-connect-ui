import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../services/user";
import { useUser } from "../../store/useUser";

export const useLogin = () => {
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const { setCsrfToken } = useUser();
    const navigate = useNavigate();

    const handleOnChangeEmail = (value: string) => {
        setEmail({ value, error: "" }); // Clear error when user types
    };

    const handleOnChangePassword = (value: string) => {
        setPassword({ value, error: "" }); // Clear error when user types
    };

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear previous errors
        setEmail((prev) => ({ ...prev, error: "" }));
        setPassword((prev) => ({ ...prev, error: "" }));

        // Validate fields
        let hasErrors = false;

        if (!email.value.trim()) {
            setEmail((prev) => ({ ...prev, error: "Email is required" }));
            hasErrors = true;
        }

        if (!password.value.trim()) {
            setPassword((prev) => ({ ...prev, error: "Password is required" }));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        setIsFormSubmitting(true);

        userService
            .login(email.value, password.value)
            .then((response) => {
                setCsrfToken(response.csrfToken);
                console.log(response.data);
                navigate(`/${response.data.role.toLowerCase()}`);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsFormSubmitting(false);
            });
    };

    return {
        email,
        password,
        isFormSubmitting,
        handleOnChangeEmail,
        handleOnChangePassword,
        loginUser,
    };
};
