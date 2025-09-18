import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { userService } from "../services/user";
import { useUserStore } from "../store/useUserStore";
import type { User } from "../types/user";

type UseGetUsersOptions = {
    enabled?: boolean;
};

export const useGetUsers = (options: UseGetUsersOptions) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { csrfToken } = useUserStore();

    useEffect(() => {
        if (!csrfToken || !options.enabled) return;

        setIsLoading(true);
        setError(null);

        userService
            .getUsers(csrfToken)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error: Error) => {
                setError(error.message);
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [csrfToken, options.enabled]);

    return {
        users,
        isLoading,
        error,
    };
};
