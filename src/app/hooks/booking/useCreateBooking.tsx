import { useState } from "react";
import toast from "react-hot-toast";
import { bookingService } from "../../services/booking";
import { useCoachesSlotsStore } from "../../store/useCoachesSlotsStore";
import type { BookingTypeType } from "../../types/booking";

type UseCreateBookingOptions = {
    onSuccess?: () => void;
    onError?: () => void;
};

export const useCreateBooking = (options?: UseCreateBookingOptions) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { markSlotAsUnavailable } = useCoachesSlotsStore();

    const createBooking = (
        slotId: string,
        meetingType: BookingTypeType,
        agenda?: string
    ): void => {
        setIsSubmitting(true);
        setError(null);

        bookingService
            .create(slotId, meetingType, agenda)
            .then((response) => {
                toast.success(response.message);
                markSlotAsUnavailable(slotId);
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
        createBooking,
        isSubmitting,
        error,
    };
};
