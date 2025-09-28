import type { CreateSlotRequest, Slot } from "../../types/slot";
import { httpRequest } from "../../utils/http-request";

export interface CreateSlotResponse {
    success: boolean;
    message: string;

    data: { slot: Slot };
}

export const create = (
    startTime: string,
    endTime: string
): Promise<CreateSlotResponse> => {
    const createSlotRequest: CreateSlotRequest = { startTime, endTime };

    return httpRequest<CreateSlotResponse>("/slots", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createSlotRequest),
    });
};
