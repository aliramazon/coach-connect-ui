import type { LoginRequest } from "../../types/auth";
import type { User } from "../../types/user";
import { httpRequest } from "../../utils/http-request";

export interface LoginSuccessResponse {
    success: true;
    message: string;
    csrfToken: string;
    data: { user: User };
}

export const login = (
    email: string,
    password: string
): Promise<LoginSuccessResponse> => {
    const loginRequest: LoginRequest = { email, password };

    return httpRequest<LoginSuccessResponse>("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
    });
};
