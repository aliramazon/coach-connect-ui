import { useEffect } from "react";
import toast from "react-hot-toast";
import { slotService } from "../../services/slot";
import { useSlotStore } from "../../store/useSlotStore";

export const useGetSlots = (selectedDate?: Date | null) => {
    const {
        getSortedSlots,
        isLoading,
        error,
        setSlots,
        setIsLoading,
        setError,
    } = useSlotStore();

    useEffect(() => {
        setSlots([], selectedDate);
        setIsLoading(true);
        setError(null);

        const timeoutId = setTimeout(() => {
            slotService
                .getAll(selectedDate)
                .then((response) => {
                    setSlots(response.data.slots, selectedDate);
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
    }, [selectedDate, setSlots, setIsLoading, setError]);

    return {
        slots: getSortedSlots(),
        isLoading,
        error,
    };
};
