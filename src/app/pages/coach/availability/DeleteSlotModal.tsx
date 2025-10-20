import { CenteredModal } from "../../../../design-system";
import { useDeleteSlot } from "../../../hooks/slot/useDeleteSlot";
import type { Slot } from "../../../types/slot";
import { formatTimeRange } from "../../../utils/time-formatters";

type DeleteSlotModalProps = {
    show: boolean;
    onClose: () => void;
    slot: Slot | null;
};

export const DeleteSlotModal = ({
    show,
    onClose,
    slot,
}: DeleteSlotModalProps) => {
    const { isDeleting, deleteSlot } = useDeleteSlot(onClose);

    const handleDelete = () => {
        if (slot) {
            deleteSlot(slot.id);
        }
    };

    return (
        <CenteredModal
            show={show}
            showCloseIcon={true}
            onClose={onClose}
            title="Delete Availability Slot"
            subtitle={
                slot
                    ? `Are you sure you want to delete the availability slot from ${formatTimeRange(
                          slot.startTime,
                          slot.endTime
                      )}? This action cannot be undone.`
                    : ""
            }
            primaryActionButton={{
                text: "Delete",
                onClick: handleDelete,
                disabled: isDeleting,
                loading: isDeleting,
                color: "danger",
            }}
        />
    );
};
