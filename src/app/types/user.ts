import type { UserRole } from "./roles";

export interface BaseUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface User extends BaseUser {
    role: UserRole;
    phoneNumber: string;
}
