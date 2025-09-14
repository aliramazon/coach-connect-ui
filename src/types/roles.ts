export const UserRole = {
    ADMIN: "ADMIN",
    STUDENT: "STUDENT",
    COACH: "COACH",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
