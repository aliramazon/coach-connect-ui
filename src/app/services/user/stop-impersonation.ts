import { httpRequest } from "../../utils/http-request";

export interface StopImpersonationSuccessResponse {
    success: true;
    message: string;
}

export const stopImpersonation =
    (): Promise<StopImpersonationSuccessResponse> => {
        return httpRequest<StopImpersonationSuccessResponse>(
            "/users/stop-impersonation",
            {
                method: "POST",
            }
        );
    };
