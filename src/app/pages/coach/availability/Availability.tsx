import styled from "@emotion/styled";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Flex, Typography } from "../../../../design-system";
import { DatePicker } from "../../../../design-system/DatePicker";
import { PageHeader } from "../../../components/PageHeader";
import { useGetSlots } from "../../../hooks/slot/useGetSlots";
import { SlotStatus, type Slot } from "../../../types/slot";
import { formatTimeRange } from "../../../utils/time-formatters";
import { AddAvailabilityModal } from "./AddAvailabilityModal";
import { DeleteSlotModal } from "./DeleteSlotModal";

const SlotsGrid = styled.div`
    display: grid;
    grid-template-columns: max-content max-content;
    gap: var(--space-16);
    width: 100%;
    align-content: start;
`;

export const Availability = () => {
    const [showAvailability, setShowAvailability] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const { slots, isLoading } = useGetSlots(selectedDate);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleSlotClick = (slot: Slot) => {
        setSelectedSlot(slot);
        setShowDeleteModal(true);
    };

    return (
        <>
            <PageHeader
                pageTitle="Availability"
                actionButtonText="Add Availability"
                actionButtonIcon={PlusIcon}
                actionButtonOnClick={() => setShowAvailability(true)}
            />

            <Flex $gap="var(--space-32)">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    shape="rounded"
                    inlineSize="md"
                    inline
                />
                {isLoading && (
                    <Typography variant="paragraph-md">
                        Fetching your availability for this day...
                    </Typography>
                )}
                {slots.length > 0 && (
                    <SlotsGrid>
                        {slots.map((slot) => (
                            <Button
                                key={slot.id}
                                variant="outlined"
                                size="lg"
                                shape="rounded"
                                color="primary"
                                disabled={slot.status === SlotStatus.UNAVILABLE}
                                onClick={() => handleSlotClick(slot)}
                            >
                                {formatTimeRange(slot.startTime, slot.endTime)}
                            </Button>
                        ))}
                    </SlotsGrid>
                )}
                {slots.length === 0 && !isLoading && (
                    <Typography variant="paragraph-md">
                        You have not entered your availability for this day yet!
                    </Typography>
                )}
            </Flex>

            {showAvailability && (
                <AddAvailabilityModal
                    show={showAvailability}
                    onClose={() => setShowAvailability(false)}
                />
            )}

            {showDeleteModal && (
                <DeleteSlotModal
                    show={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedSlot(null);
                    }}
                    slot={selectedSlot}
                />
            )}
        </>
    );
};
