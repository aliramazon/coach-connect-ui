import type {
    BookingUpdatableStatusType,
    CancelledByType,
    NoShowPartyType,
} from "../../types/booking";
import { httpRequest } from "../../utils/http-request";

export interface UpdateBookingStatusRequest {
    status: BookingUpdatableStatusType;
    cancelledBy?: CancelledByType;
    noShowParty?: NoShowPartyType;
}

export interface UpdateBookingStatusResponse {
    success: boolean;
    message: string;
    data: {
        id: string;
        status: BookingUpdatableStatusType;
        cancelledBy?: CancelledByType;
        noShowParty?: NoShowPartyType;
    };
}

export const updateStatus = (
    bookingId: string,
    request: UpdateBookingStatusRequest
): Promise<UpdateBookingStatusResponse> => {
    return httpRequest<UpdateBookingStatusResponse>(
        `/bookings/${bookingId}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    );
};
