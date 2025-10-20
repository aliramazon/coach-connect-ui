import { useState } from "react";
import toast from "react-hot-toast";
import { slotService } from "../../services/slot";
import { useSlotStore } from "../../store/useSlotStore";

export const useDeleteSlot = (onSuccess?: () => void) => {
    const { removeSlot } = useSlotStore();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteSlot = (slotId: string) => {
        setIsDeleting(true);
        setError(null);

        slotService
            .deleteSlot(slotId)
            .then((response) => {
                removeSlot(slotId);
                toast.success(response.message);
                onSuccess?.();
            })
            .catch((err) => {
                setError(err.message);
                toast.error(err.message);
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    return {
        isDeleting,
        error,
        deleteSlot,
    };
};
