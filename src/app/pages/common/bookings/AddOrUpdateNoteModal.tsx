import { useEffect, useState } from "react";
import { CenteredModal, Flex, Input } from "../../../../design-system";
import { useCreateOrUpdateCallReview } from "../../../hooks/call-review/useCreateOrUpdateCallReview";
import { useUserStore } from "../../../store/useUserStore";
import type { Booking } from "../../../types/booking";
import { UserRole } from "../../../types/roles";

type AddOrUpdateNoteModalProps = {
    show: boolean;
    onClose: () => void;
    booking: Booking;
};

export const AddOrUpdateNoteModal: React.FC<AddOrUpdateNoteModalProps> = ({
    show,
    onClose,
    booking,
}) => {
    const { getEffectiveUser } = useUserStore();
    const effectiveUser = getEffectiveUser();
    const isStudent = effectiveUser?.role === UserRole.STUDENT;
    const isCoach = effectiveUser?.role === UserRole.COACH;

    const hasNotes =
        booking.review &&
        ((isStudent &&
            "studentNotes" in booking.review &&
            booking.review.studentNotes) ||
            (isCoach &&
                "coachNotes" in booking.review &&
                booking.review.coachNotes));

    const [notes, setNotes] = useState<string>("");

    const { createOrUpdateCallReview, isSubmitting } =
        useCreateOrUpdateCallReview({
            onSuccess: () => {
                onClose();
            },
            onError: () => {
                // Keep modal open on error so user can retry
            },
        });

    // Initialize notes with existing value when modal opens
    useEffect(() => {
        if (show) {
            let existingNotes = "";
            if (booking.review) {
                if (
                    isStudent &&
                    "studentNotes" in booking.review &&
                    booking.review.studentNotes
                ) {
                    existingNotes = booking.review.studentNotes;
                } else if (
                    isCoach &&
                    "coachNotes" in booking.review &&
                    booking.review.coachNotes
                ) {
                    existingNotes = booking.review.coachNotes;
                }
            }
            setNotes(existingNotes);
        }
    }, [show, booking.review, isStudent, isCoach]);

    const handleSave = () => {
        if (!hasNotes && notes.length === 0) return;
        if (isStudent) {
            createOrUpdateCallReview({
                bookingId: booking.id,
                studentNotes: notes || "",
            });
        } else if (isCoach) {
            createOrUpdateCallReview({
                bookingId: booking.id,
                coachNotes: notes || "",
            });
        }
    };

    const handleClose = () => {
        setNotes("");
        onClose();
    };

    return (
        <CenteredModal
            show={show}
            showCloseIcon
            onClose={handleClose}
            title={hasNotes ? "Update Note" : "Add Note"}
            subtitle="Add or update your notes for this booking session."
            primaryActionButton={{
                text: hasNotes ? "Update Note" : "Add Note",
                onClick: handleSave,
                disabled: isSubmitting,
                loading: isSubmitting,
            }}
            secondaryActionButton={{
                text: "Cancel",
                onClick: handleClose,
            }}
        >
            <Flex $flexDirection="column" $rowGap="var(--space-16)">
                <Input
                    id="notes"
                    type="textarea"
                    label="Notes"
                    placeholder="Enter your notes about this session..."
                    value={notes}
                    onChange={setNotes}
                    shape="rounded"
                    size="lg"
                    clearable
                />
            </Flex>
        </CenteredModal>
    );
};
