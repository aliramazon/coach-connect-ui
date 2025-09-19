import { httpRequest } from "../../utils/http-request";

export interface LogoutSuccessResponse {
    success: true;
    message: string;
}

export const logout = (): Promise<LogoutSuccessResponse> => {
    return httpRequest<LogoutSuccessResponse>("/users/logout", {
        method: "POST",
    });
};
