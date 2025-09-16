import { getMe } from "./get-me";
import { getUsers } from "./get-users";
import { impersonateUser } from "./impersonate";
import { login } from "./login";
import { logout } from "./logout";

export const userService = {
    login: login,
    getMe: getMe,
    logout: logout,
    getUsers: getUsers,
    impersonateUser: impersonateUser,
};
