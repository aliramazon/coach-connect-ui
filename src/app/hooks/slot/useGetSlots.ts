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
        setIsLoading(true);
        setError(null);

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
    }, [selectedDate, setSlots, setIsLoading, setError]);

    return {
        slots: getSortedSlots(),
        isLoading,
        error,
    };
};
