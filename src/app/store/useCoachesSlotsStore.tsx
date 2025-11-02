import { create } from "zustand";
import type { CoachWithSlots } from "../services/coaches-slots/get-all";
import { SlotStatus } from "../types/slot";

export interface CoachesSlotsStore {
    coaches: CoachWithSlots[];
    currentDate: Date | null;
    isLoading: boolean;
    error: string | null;
    setCoaches: (coaches: CoachWithSlots[], date?: Date | null) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearCoaches: () => void;
    markSlotAsUnavailable: (slotId: string) => void;
}

export const useCoachesSlotsStore = create<CoachesSlotsStore>((set) => ({
    coaches: [],
    currentDate: null,
    isLoading: false,
    error: null,

    setCoaches: (coaches, date) => set({ coaches, currentDate: date || null }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearCoaches: () => set({ coaches: [], currentDate: null, error: null }),
    markSlotAsUnavailable: (slotId) =>
        set((state) => ({
            coaches: state.coaches.map((coach) => ({
                ...coach,
                coachSlots: coach.coachSlots.map((slot) =>
                    slot.id === slotId
                        ? { ...slot, status: SlotStatus.UNAVILABLE }
                        : slot
                ),
            })),
        })),
}));
