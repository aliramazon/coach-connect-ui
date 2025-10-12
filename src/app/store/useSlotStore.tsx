import { create } from "zustand";
import type { Slot } from "../types/slot";
import { isSameDate } from "../utils/validators";

export interface SlotStore {
    slots: Slot[];
    currentDate: Date | null;
    isLoading: boolean;
    error: string | null;
    setSlots: (slots: Slot[], date?: Date | null) => void;
    addSlot: (slot: Slot) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearSlots: () => void;
    getSortedSlots: () => Slot[];
}

export const useSlotStore = create<SlotStore>((set, get) => ({
    slots: [],
    currentDate: null,
    isLoading: false,
    error: null,

    setSlots: (slots, date) => {
        set({ slots, currentDate: date || null });
    },
    addSlot: (slot) => {
        const { currentDate } = get();

        if (currentDate) {
            const slotDate = new Date(slot.startTime);

            if (isSameDate(slotDate, currentDate)) {
                set((state) => ({
                    slots: [...state.slots, slot],
                }));
            }
        }
    },
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearSlots: () => set({ slots: [], currentDate: null, error: null }),

    getSortedSlots: () => {
        const { slots } = get();

        return [...slots].sort(
            (a, b) =>
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
        );
    },
}));
