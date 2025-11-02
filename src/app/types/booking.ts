export const BookingType = {
    PHONE_CALL: "PHONE_CALL",
    VIDEO_CALL: "VIDEO_CALL",
} as const;

export type BookingType = (typeof BookingType)[keyof typeof BookingType];

export interface CreateBookingRequest {
    slotId: string;
    type: BookingType;
}
