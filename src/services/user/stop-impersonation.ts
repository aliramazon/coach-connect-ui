import { config } from "../config";

export interface StopImpersonationSuccessResponse {
    success: true;
    message: string;
}

export interface StopImpersonationErrorResponse {
    success: false;
    message: string;
}

export const stopImpersonation =
    async (): Promise<StopImpersonationSuccessResponse> => {
        try {
            const res = await fetch(
                `${config.apiBaseUrl}/users/stop-impersonation`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || "Stop impersonation request failed"
                );
            }

            const response: StopImpersonationSuccessResponse = await res.json();
            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error(
                "An unexpected error occurred while stopping impersonation"
            );
        }
    };
