import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { slotService } from "../../services/slot";
import type { Slot } from "../../types/slot";

export const useGetSlots = (selectedDate?: Date | null) => {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSlots = useCallback(() => {
        setIsLoading(true);
        setError(null);

        slotService
            .getAll(selectedDate)
            .then((response) => {
                setSlots(response.data.slots);
            })
            .catch((err) => {
                setError(err.message);
                toast.error(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [selectedDate]);

    useEffect(() => {
        fetchSlots();
    }, [fetchSlots]);

    return {
        slots,
        isLoading,
        error,
        refetch: fetchSlots,
    };
};
