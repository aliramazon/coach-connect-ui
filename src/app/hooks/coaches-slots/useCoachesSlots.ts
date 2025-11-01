import { useEffect } from "react";
import toast from "react-hot-toast";
import { coachesSlotsService } from "../../services/coaches-slots";
import { useCoachesSlotsStore } from "../../store/useCoachesSlotsStore";
import { isSameDate } from "../../utils/validators";

export const useCoachesSlots = (date: Date) => {
    const {
        coaches,
        currentDate,
        isLoading,
        error,
        setCoaches,
        setIsLoading,
        setError,
    } = useCoachesSlotsStore();

    useEffect(() => {
        if (!date) {
            return;
        }
        const shouldFetch =
            !currentDate ||
            !isSameDate(currentDate, date) ||
            coaches.length === 0;

        if (!shouldFetch) {
            return;
        }

        setCoaches([], date);
        setIsLoading(true);
        setError(null);

        const timeoutId = setTimeout(() => {
            coachesSlotsService
                .getAll(date)
                .then((response) => {
                    setCoaches(response.data.coaches, date);
                })
                .catch((err) => {
                    setError(err.message);
                    toast.error(err.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [date, currentDate, coaches.length, setCoaches, setIsLoading, setError]);

    return {
        coaches,
        isLoading,
        error,
    };
};
