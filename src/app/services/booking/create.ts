import type { BookingType, CreateBookingRequest } from "../../types/booking";
import { httpRequest } from "../../utils/http-request";

export interface CreateBookingResponse {
    success: boolean;
    message: string;
}

export const create = (
    slotId: string,
    type: BookingType
): Promise<CreateBookingResponse> => {
    const createBookingRequest: CreateBookingRequest = {
        slotId,
        type,
    };

    return httpRequest<CreateBookingResponse>("/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createBookingRequest),
    });
};
