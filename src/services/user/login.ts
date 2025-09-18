import type { LoginRequest } from "../../types/auth";
import type { User } from "../../types/user";
import { config } from "../config";

export interface LoginSuccessResponse {
    success: true;
    message: string;
    csrfToken: string;
    data: { user: User };
}

export interface LoginErrorResponse {
    success: false;
    message: string;
    errorType: string;
    isOperational: boolean;
}
export const login = async (
    email: string,
    password: string
): Promise<LoginSuccessResponse> => {
    try {
        const loginRequest: LoginRequest = {
            email,
            password,
        };

        const res = await fetch(`${config.apiBaseUrl}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(loginRequest),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login request failed");
        }

        const response: LoginSuccessResponse = await res.json();

        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred during login");
    }
};
