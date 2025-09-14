import { getMe } from "./get-me";
import { login } from "./login";
import { logout } from "./logout";

export const userService = {
    login: login,
    getMe: getMe,
    logout: logout,
};
