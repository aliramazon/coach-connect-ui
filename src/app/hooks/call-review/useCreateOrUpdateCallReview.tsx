import { useState } from "react";
import toast from "react-hot-toast";
import { callReviewService } from "../../services/call-review";
import { useBookingsStore } from "../../store/useBookingsStore";
import type { CreateOrUpdateCallReviewRequest } from "../../types/call-review";

type UseCreateOrUpdateCallReviewOptions = {
    onSuccess?: () => void;
    onError?: () => void;
};

export const useCreateOrUpdateCallReview = (
    options?: UseCreateOrUpdateCallReviewOptions
) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { updateBookingReview } = useBookingsStore();

    const createOrUpdateCallReview = (
        request: CreateOrUpdateCallReviewRequest
    ): void => {
        setIsSubmitting(true);
        setError(null);

        callReviewService
            .createOrUpdate(request)
            .then((response) => {
                toast.success(response.message);
                updateBookingReview(request.bookingId, response.data.review);
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
        createOrUpdateCallReview,
        isSubmitting,
        error,
    };
};
