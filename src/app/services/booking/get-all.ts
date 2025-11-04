import type { Booking } from "../../types/booking";
import { httpRequest } from "../../utils/http-request";

export interface GetAllBookingsResponse {
    success: boolean;
    message: string;
    data: { bookings: Booking[] };
}

export const getAll = (date: Date): Promise<GetAllBookingsResponse> => {
    const params = new URLSearchParams();
    params.append("date", date.toISOString());
    params.append("timeZone", Intl.DateTimeFormat().resolvedOptions().timeZone);

    const url = `/bookings${params.toString() ? `?${params.toString()}` : ""}`;

    return httpRequest<GetAllBookingsResponse>(url as `/${string}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
