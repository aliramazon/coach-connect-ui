import type { Slot } from "../../types/slot";
import type { BaseUser } from "../../types/user";
import { httpRequest } from "../../utils/http-request";

export interface CoachWithSlots extends BaseUser {
    coachSlots: Slot[];
    averageRating: number | null;
}

export interface GetAllCoachesSlotsResponse {
    success: boolean;
    message: string;
    data: { coaches: CoachWithSlots[] };
}

export const getAll = (date: Date): Promise<GetAllCoachesSlotsResponse> => {
    const params = new URLSearchParams();
    params.append("date", date.toISOString());
    params.append("timeZone", Intl.DateTimeFormat().resolvedOptions().timeZone);

    const url = `/coaches/with-slots?${params.toString()}`;

    return httpRequest<GetAllCoachesSlotsResponse>(url as `/${string}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
