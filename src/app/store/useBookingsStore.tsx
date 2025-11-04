import { create } from "zustand";
import type { Booking } from "../types/booking";

export interface BookingsStore {
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    setBookings: (bookings: Booking[]) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearBookings: () => void;
}

export const useBookingsStore = create<BookingsStore>((set) => ({
    bookings: [],
    isLoading: false,
    error: null,

    setBookings: (bookings) => set({ bookings }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearBookings: () => set({ bookings: [], error: null }),
}));
