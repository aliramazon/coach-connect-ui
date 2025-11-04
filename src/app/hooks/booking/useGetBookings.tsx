import { useEffect } from "react";
import toast from "react-hot-toast";
import { bookingService } from "../../services/booking";
import { useBookingsStore } from "../../store/useBookingsStore";

export const useGetBookings = (date: Date) => {
    const { bookings, isLoading, error, setBookings, setIsLoading, setError } =
        useBookingsStore();

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        bookingService
            .getAll(date)
            .then((response) => {
                setBookings(response.data.bookings);
            })
            .catch((err) => {
                setError(err.message);
                toast.error(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [date, setBookings, setIsLoading, setError]);

    return {
        bookings,
        isLoading,
        error,
    };
};
