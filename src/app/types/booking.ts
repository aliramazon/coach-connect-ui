import type { BaseSlot } from "./slot";
import type { User } from "./user";

export const BookingType = {
    PHONE_CALL: "PHONE_CALL",
    VIDEO_CALL: "VIDEO_CALL",
} as const;

export type BookingType = (typeof BookingType)[keyof typeof BookingType];

export const BookingStatus = {
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    NO_SHOW: "NO_SHOW",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export const NoShowParty = {
    STUDENT: "STUDENT",
    COACH: "COACH",
} as const;

export type NoShowParty = (typeof NoShowParty)[keyof typeof NoShowParty];

export const CompletedBy = {
    SYSTEM: "SYSTEM",
    STUDENT: "STUDENT",
    COACH: "COACH",
} as const;

export type CompletedBy = (typeof CompletedBy)[keyof typeof CompletedBy];

export interface CreateBookingRequest {
    slotId: string;
    type: BookingType;
}

export interface Booking {
    id: string;
    status: BookingStatus;
    type: BookingType;
    slot: BaseSlot;
    student?: Omit<User, "role">;
    coach?: Omit<User, "role">;
}
