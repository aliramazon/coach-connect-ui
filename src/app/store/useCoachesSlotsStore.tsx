import { create } from "zustand";
import type { CoachWithSlots } from "../services/coaches-slots/get-all";

export interface CoachesSlotsStore {
    coaches: CoachWithSlots[];
    currentDate: Date | null;
    isLoading: boolean;
    error: string | null;
    setCoaches: (coaches: CoachWithSlots[], date?: Date | null) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearCoaches: () => void;
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
}));
