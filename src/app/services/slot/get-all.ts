import type { Slot } from "../../types/slot";
import { httpRequest } from "../../utils/http-request";

export interface GetAllSlotsResponse {
    success: boolean;
    message: string;
    data: { slots: Slot[] };
}

export const getAll = (date?: Date | null): Promise<GetAllSlotsResponse> => {
    const params = new URLSearchParams();
    if (date) {
        params.append("date", date.toISOString());
    }
    params.append("timeZone", Intl.DateTimeFormat().resolvedOptions().timeZone);

    const url = `/slots${params.toString() ? `?${params.toString()}` : ""}`;

    return httpRequest<GetAllSlotsResponse>(url as `/${string}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
