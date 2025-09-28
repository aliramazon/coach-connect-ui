export const SlotStatus = {
    AVAILABLE: "AVAILABLE",
    UNAVILABLE: "UNAVAILABLE",
} as const;

export type SlotStatus = (typeof SlotStatus)[keyof typeof SlotStatus];

export interface Slot {
    id: string;
    startTime: string;
    endTime: string;
    status: SlotStatus;
    createdAt: string;
    updatedAt?: Date;
}

export interface CreateSlotRequest {
    startTime: string;
    endTime: string;
}
