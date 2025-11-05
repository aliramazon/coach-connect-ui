import { useState } from "react";
import toast from "react-hot-toast";
import { bookingService } from "../../services/booking";
import { useBookingsStore } from "../../store/useBookingsStore";
import type {
    BookingUpdatableStatusType,
    CancelledByType,
    NoShowPartyType,
} from "../../types/booking";

type UseUpdateBookingStatusOptions = {
    onSuccess?: () => void;
    onError?: () => void;
};

export const useUpdateBookingStatus = (
    options?: UseUpdateBookingStatusOptions
) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { updateBookingStatus } = useBookingsStore();

    const updateStatus = (
        bookingId: string,
        status: BookingUpdatableStatusType,
        cancelledBy?: CancelledByType,
        noShowParty?: NoShowPartyType
    ): void => {
        setIsSubmitting(true);
        setError(null);

        bookingService
            .updateStatus(bookingId, {
                status,
                ...(cancelledBy && { cancelledBy }),
                ...(noShowParty && { noShowParty }),
            })
            .then((response) => {
                toast.success(response.message);
                updateBookingStatus(bookingId, status);
                if (options?.onSuccess) {
                    options.onSuccess();
                }
            })
            .catch((err) => {
                setError(err.message);
                toast.error(err.message);
                if (options?.onError) {
                    options.onError();
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return {
        updateStatus,
        isSubmitting,
        error,
    };
};
