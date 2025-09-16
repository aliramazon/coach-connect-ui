import { useUserStore } from "../../pages/store/useUserStore";
import type { User } from "../../types/user";
import { config } from "../config";

export interface ImpersonateSuccessResponse {
    success: true;
    message: string;
    data: Pick<User, "role">;
}

export interface ImpersonateErrorResponse {
    success: false;
    message: string;
    errorType: string;
    isOperational: boolean;
}

export const impersonateUser = async (
    userId: string
): Promise<ImpersonateSuccessResponse> => {
    try {
        const { csrfToken } = useUserStore.getState();

        if (!csrfToken) {
            throw new Error("Invalid Request");
        }
        const res = await fetch(
            `${config.apiBaseUrl}/users/${userId}/impersonate`,
            {
                method: "POST",
                headers: {
                    "x-csrf-token": csrfToken,
                },
                credentials: "include",
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                errorData.message || "Impersonation request failed"
            );
        }

        const response: ImpersonateSuccessResponse = await res.json();

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred during impersonation");
    }
};
