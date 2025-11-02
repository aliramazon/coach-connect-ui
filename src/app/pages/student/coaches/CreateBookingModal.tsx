import { useState } from "react";
import { CenteredModal, Flex, Radio } from "../../../../design-system";
import { useCreateBooking } from "../../../hooks/booking/useCreateBooking";
import { BookingType } from "../../../types/booking";

type CreateBookingModalProps = {
    show: boolean;
    onClose: () => void;
    slotId: string;
    slotTimeRange: string;
};

export const CreateBookingModal: React.FC<CreateBookingModalProps> = ({
    show,
    onClose,
    slotId,
    slotTimeRange,
}) => {
    const [selectedBookingType, setSelectedBookingType] = useState<BookingType>(
        BookingType.VIDEO_CALL
    );
    const { createBooking, isSubmitting } = useCreateBooking({
        onSuccess: () => {
            onClose();
        },
        onError: () => {
            onClose();
        },
    });

    const handleBook = () => {
        createBooking(slotId, selectedBookingType);
    };

    const handleClose = () => {
        setSelectedBookingType(BookingType.VIDEO_CALL);
        onClose();
    };

    return (
        <CenteredModal
            show={show}
            showCloseIcon
            onClose={handleClose}
            title="Create Booking"
            subtitle={`Select the meeting type for ${slotTimeRange}`}
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
            <Flex $flexDirection="column" $rowGap="1.6rem">
                <Flex $flexDirection="column" $gap="var(--space-8)">
                    <Radio
                        id="booking-type-video"
                        name="booking-type"
                        value={BookingType.VIDEO_CALL}
                        label="Video Call"
                        checked={selectedBookingType === BookingType.VIDEO_CALL}
                        onChange={(value) =>
                            setSelectedBookingType(value as BookingType)
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
                            setSelectedBookingType(value as BookingType)
                        }
                        shape="circle"
                    />
                </Flex>
            </Flex>
        </CenteredModal>
    );
};
