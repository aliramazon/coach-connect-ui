import styled from "@emotion/styled";
import { useState } from "react";
import { DatePicker, Flex, Typography } from "../../../../design-system";
import { PageBody } from "../../../components/Layout";
import { PageHeader } from "../../../components/PageHeader";
import { useCoachesSlots } from "../../../hooks/coaches-slots/useCoachesSlots";
import type { Slot } from "../../../types/slot";
import { formatTimeRange } from "../../../utils/time-formatters";
import { CoachesAvailability } from "./CoachesAvailability";
import { CreateBookingModal } from "./CreateBookingModal";

const DatePickerWrapper = styled.div`
    margin-bottom: var(--space-32);
    width: 30rem;
`;

export const CoachesAvailabilityContainer = () => {
    // Set today's date (without time) for both minDate and initial selectedDate
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const { coaches, isLoading, error } = useCoachesSlots(selectedDate);

    const handleSlotClick = (slot: Slot) => {
        setSelectedSlot(slot);
    };

    const handleCloseModal = () => {
        setSelectedSlot(null);
    };

    return (
        <>
            <PageHeader pageTitle="Coaches" />
            <PageBody>
                <DatePickerWrapper>
                    <DatePicker
                        inputSize="md"
                        shape="rounded"
                        label="Select Date"
                        id="coach-date-picker"
                        placeholderText="Select a date to view availability"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date as Date)}
                        dateFormat="MMMM d, yyyy"
                        minDate={today}
                    />
                </DatePickerWrapper>

                <Flex $flexDirection="column" $gap="var(--space-24)">
                    {isLoading && (
                        <Typography variant="paragraph-md">
                            Loading coaches availability...
                        </Typography>
                    )}

                    {error && (
                        <Typography variant="paragraph-md" color="error">
                            {error}
                        </Typography>
                    )}

                    {!isLoading && !error && (
                        <CoachesAvailability
                            coaches={coaches}
                            onSlotClick={handleSlotClick}
                        />
                    )}
                </Flex>
            </PageBody>

            {selectedSlot && (
                <CreateBookingModal
                    show={!!selectedSlot}
                    onClose={handleCloseModal}
                    slotId={selectedSlot.id}
                    slotTimeRange={formatTimeRange(
                        selectedSlot.startTime,
                        selectedSlot.endTime
                    )}
                />
            )}
        </>
    );
};
