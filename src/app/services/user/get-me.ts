import type { User } from "../../types/user";
import { httpRequest } from "../../utils/http-request";

export interface GetMeSuccessResponse {
    success: true;
    data: { user: User; impersonatedUser?: User };
    csrfToken: string;
    isImpersonating: boolean;
}

export const getMe = async (): Promise<GetMeSuccessResponse> => {
    return httpRequest<GetMeSuccessResponse>("/users/me");
};
