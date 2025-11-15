import type {
    BookingTypeType,
    CreateBookingRequest,
} from "../../types/booking";
import { httpRequest } from "../../utils/http-request";

export interface CreateBookingResponse {
    success: boolean;
    message: string;
}

export const create = (
    slotId: string,
    type: BookingTypeType,
    agenda?: string
): Promise<CreateBookingResponse> => {
    const createBookingRequest: CreateBookingRequest = {
        slotId,
        type,
        ...(agenda && { agenda }),
    };

    return httpRequest<CreateBookingResponse>("/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createBookingRequest),
    });
};
