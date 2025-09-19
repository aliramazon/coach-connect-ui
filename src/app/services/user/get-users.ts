import type { User } from "../../types/user";
import { httpRequest } from "../../utils/http-request";

export interface GetUsersSuccessResponse {
    success: true;
    data: User[];
}

export const getUsers = (): Promise<GetUsersSuccessResponse> =>
    httpRequest<GetUsersSuccessResponse>("/users");
