import { config } from "../config";

export interface LogoutSuccessResponse {
    success: true;
    message: string;
}

export interface LogoutErrorResponse {
    success: false;
    message: string;
}

export const logout = async (): Promise<LogoutSuccessResponse> => {
    try {
        const res = await fetch(`${config.apiBaseUrl}/users/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Logout request failed");
        }

        const response: LogoutSuccessResponse = await res.json();
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred during logout");
    }
};
