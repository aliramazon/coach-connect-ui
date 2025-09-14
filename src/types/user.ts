import type { UserRole } from "./roles";

export interface User {
    id: string;
    role: UserRole;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
