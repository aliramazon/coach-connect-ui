import { useState } from "react";
import { CenteredModal, Flex, Input, Radio } from "../../../../design-system";
import { useCreateBooking } from "../../../hooks/booking/useCreateBooking";
import type { BookingTypeType } from "../../../types/booking";
import { BookingType } from "../../../types/booking";

type CreateBookingModalProps = {
    show: boolean;
    onClose: () => void;
    slotId: string;
    slotTimeRange: string;
    coachFirstName: string;
    coachLastName: string;
};

export const CreateBookingModal: React.FC<CreateBookingModalProps> = ({
    show,
    onClose,
    slotId,
    slotTimeRange,
    coachFirstName,
    coachLastName,
}) => {
    const getCoachFullName = () => {
        return `${coachFirstName} ${coachLastName}`;
    };
    const [selectedBookingType, setSelectedBookingType] =
        useState<BookingTypeType>(BookingType.VIDEO_CALL);
    const [agenda, setAgenda] = useState<string>("");
    const { createBooking, isSubmitting } = useCreateBooking({
        onSuccess: () => {
            onClose();
        },
        onError: () => {
            onClose();
        },
    });

    const handleBook = () => {
        createBooking(slotId, selectedBookingType, agenda);
    };

    const handleClose = () => {
        setSelectedBookingType(BookingType.VIDEO_CALL);
        setAgenda("");
        onClose();
    };

    return (
        <CenteredModal
            show={show}
            showCloseIcon
            onClose={handleClose}
            title="Book a session "
            subtitle={`Select session type with ${getCoachFullName()} at\n${slotTimeRange}`}
            primaryActionButton={{
                text: "Book",
                onClick: handleBook,
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
                    id="booking-agenda"
                    type="textarea"
                    label="Agenda (Optional)"
                    placeholder="What would you like to discuss in this session?"
                    value={agenda}
                    onChange={setAgenda}
                    shape="rounded"
                    size="lg"
                    clearable
                />
                <Flex $gap="var(--space-16)">
                    <Radio
                        id="booking-type-video"
                        name="booking-type"
                        value={BookingType.VIDEO_CALL}
                        label="Video Call"
                        checked={selectedBookingType === BookingType.VIDEO_CALL}
                        onChange={(value) =>
                            setSelectedBookingType(value as BookingTypeType)
                        }
                        shape="circle"
                    />
                    <Radio
                        id="booking-type-call"
                        name="booking-type"
                        value={BookingType.PHONE_CALL}
                        label="Phone Call"
                        checked={selectedBookingType === BookingType.PHONE_CALL}
                        onChange={(value) =>
                            setSelectedBookingType(value as BookingTypeType)
                        }
                        shape="circle"
                    />
                </Flex>
            </Flex>
        </CenteredModal>
    );
};
