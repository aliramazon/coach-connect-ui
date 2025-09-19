import type { User } from "../../types/user";
import { httpRequest } from "../../utils/http-request";

export interface ImpersonateSuccessResponse {
    success: true;
    message: string;
    data: { user: User };
}

export const impersonateUser = async (
    userId: string
): Promise<ImpersonateSuccessResponse> => {
    return httpRequest<ImpersonateSuccessResponse>(
        `/users/${userId}/impersonate`,
        {
            method: "POST",
        }
    );
};
