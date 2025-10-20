import { httpRequest } from "../../utils/http-request";

export interface DeleteSlotResponse {
    success: boolean;
    message: string;
}

export const deleteSlot = (slotId: string): Promise<DeleteSlotResponse> => {
    return httpRequest<DeleteSlotResponse>(`/slots/${slotId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
