import { useUserStore } from "../store/useUserStore";
import type { ApiErrorResponse } from "../types/api-error";
import { ApiError } from "./api-error";

const config = {
    apiBaseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
};

export const httpRequest = async <T>(
    url: `/${string}`,
    options?: RequestInit
): Promise<T> => {
    try {
        const { csrfToken } = useUserStore.getState();

        const headers: HeadersInit = {
            ...(options?.headers || {}),
            ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
        };

        const res = await fetch(`${config.apiBaseUrl}${url}`, {
            credentials: "include",
            ...options,
            headers,
        });

        if (!res.ok) {
            const errorData = (await res.json()) as ApiErrorResponse;
            throw new ApiError(
                errorData.message || "Request failed",
                res.status,
                errorData.errorCode,
                errorData.isOperational
            );
        }

        return (await res.json()) as T;
    } catch (error) {
        console.clear();
        if (error instanceof ApiError) throw error;
        if (error instanceof Error) {
            throw new ApiError(error.message, 500, "INTERNAL_ERROR", false);
        }
        throw new ApiError("Unexpected error", 500, "INTERNAL_ERROR", false);
    }
};
