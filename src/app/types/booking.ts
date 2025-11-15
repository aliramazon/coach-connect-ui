import type { CallReview } from "./call-review";
import type { BaseSlot } from "./slot";
import type { User } from "./user";

export const BookingType = {
    PHONE_CALL: "PHONE_CALL",
    VIDEO_CALL: "VIDEO_CALL",
} as const;

export type BookingTypeType = (typeof BookingType)[keyof typeof BookingType];

export const BookingStatus = {
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    NO_SHOW: "NO_SHOW",
} as const;

export type BookingStatusType =
    (typeof BookingStatus)[keyof typeof BookingStatus];

export type BookingUpdatableStatusType = "NO_SHOW" | "CANCELLED";

export const NoShowParty = {
    STUDENT: "STUDENT",
    COACH: "COACH",
} as const;

export type NoShowPartyType = (typeof NoShowParty)[keyof typeof NoShowParty];

export const CompletedBy = {
    SYSTEM: "SYSTEM",
    STUDENT: "STUDENT",
    COACH: "COACH",
} as const;

export type CompletedByType = (typeof CompletedBy)[keyof typeof CompletedBy];

export const CancelledBy = {
    STUDENT: "STUDENT",
    COACH: "COACH",
} as const;

export type CancelledByType = (typeof CancelledBy)[keyof typeof CancelledBy];

export interface CreateBookingRequest {
    slotId: string;
    type: BookingTypeType;
    agenda?: string;
}

export interface Booking {
    id: string;
    status: BookingStatusType;
    type: BookingTypeType;
    slot: BaseSlot;
    student?: Omit<User, "role">;
    coach?: Omit<User, "role">;
    agenda?: string;
    review?: CallReview;
}
