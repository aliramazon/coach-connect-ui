import { create } from "zustand";
import type { Booking, BookingUpdatableStatusType } from "../types/booking";
import type { CallReview } from "../types/call-review";

export interface BookingsStore {
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    setBookings: (bookings: Booking[]) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearBookings: () => void;
    updateBookingStatus: (
        bookingId: string,
        status: BookingUpdatableStatusType
    ) => void;
    updateBookingReview: (bookingId: string, review: CallReview) => void;
}

export const useBookingsStore = create<BookingsStore>((set) => ({
    bookings: [],
    isLoading: false,
    error: null,

    setBookings: (bookings) => set({ bookings }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearBookings: () => set({ bookings: [], error: null }),

    updateBookingStatus: (bookingId, status) =>
        set((state) => ({
            bookings: state.bookings.map((booking) =>
                booking.id === bookingId ? { ...booking, status } : booking
            ),
        })),

    updateBookingReview: (bookingId, review) =>
        set((state) => ({
            bookings: state.bookings.map((booking) =>
                booking.id === bookingId ? { ...booking, review } : booking
            ),
        })),
}));
