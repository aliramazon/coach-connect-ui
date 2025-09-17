import type { User } from "../../types/user";
import { config } from "../config";

export interface GetMeSuccessResponse {
    success: true;
    data: { user: User; impersonatedUser?: User };
    csrfToken: string;
    isImpersonating: boolean;
}

export interface GetMeErrorResponse {
    success: false;
    message: string;
}

export const getMe = async (): Promise<GetMeSuccessResponse> => {
    try {
        const res = await fetch(`${config.apiBaseUrl}/users/me`, {
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch user data");
        }

        const response: GetMeSuccessResponse = await res.json();
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error(
            "An unexpected error occurred while fetching user data"
        );
    }
};
