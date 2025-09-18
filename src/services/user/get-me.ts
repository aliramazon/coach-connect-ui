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
    errorType: string; // comes from GlobalError
    isOperational: boolean;
    timestamp: string;
}

// Custom error type for thrown errors
export class ApiError extends Error {
    status: number;
    clientErrorType: string;
    isOperational: boolean;

    constructor(
        message: string,
        status: number,
        clientErrorType: string,
        isOperational: boolean
    ) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.clientErrorType = clientErrorType;
        this.isOperational = isOperational;
    }
}

export const getMe = async (): Promise<GetMeSuccessResponse> => {
    try {
        const res = await fetch(`${config.apiBaseUrl}/users/me`, {
            credentials: "include",
        });

        if (!res.ok) {
            const errorData: GetMeErrorResponse = await res.json();
            throw new ApiError(
                errorData.message || "Failed to fetch user data",
                res.status,
                errorData.errorType,
                errorData.isOperational
            );
        }

        const response: GetMeSuccessResponse = await res.json();
        return response;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        if (error instanceof Error) {
            throw new ApiError(error.message, 500, "INTERNAL_ERROR", false);
        }
        throw new ApiError("Unexpected error", 500, "INTERNAL_ERROR", false);
    }
};
