import type { User } from "../../types/user";
import { config } from "../config";

export interface GetUsersSuccessResponse {
    success: true;
    data: User[];
}

export interface GetUsersErrorResponse {
    success: false;
    message: string;
}

export const getUsers = async (
    csrfToken: string
): Promise<GetUsersSuccessResponse> => {
    try {
        const res = await fetch(`${config.apiBaseUrl}/users`, {
            method: "GET",
            headers: {
                "x-csrf-token": csrfToken,
            },
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch users");
        }

        const response: GetUsersSuccessResponse = await res.json();
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred while fetching users");
    }
};
