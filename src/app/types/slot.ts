export const SlotStatus = {
    AVAILABLE: "AVAILABLE",
    UNAVILABLE: "UNAVAILABLE",
} as const;

export type SlotStatus = (typeof SlotStatus)[keyof typeof SlotStatus];

export interface BaseSlot {
    id: string;
    startTime: string;
    endTime: string;
}
export interface Slot extends BaseSlot {
    status: SlotStatus;
    isPast?: boolean;
}

export interface CreateSlotRequest {
    startTime: string;
    endTime: string;
}
