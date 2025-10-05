import { PlusIcon } from "lucide-react";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Flex } from "../../../../design-system";
import { DatePicker } from "../../../../design-system/DatePicker";
import { PageHeader } from "../../../components/PageHeader";
import { useGetSlots } from "../../../hooks/slot/useGetSlots";
import { AddAvailabilityModal } from "./AddAvailabilityModal";

export const Availability = () => {
    const [showAvailability, setShowAvailability] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const { slots } = useGetSlots(selectedDate);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        console.log(date?.toISOString());
        console.log("Selected date:", date);
    };

    const formatTimeRange = (start: string, end: string) => {
        const startTime = new Date(start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        const endTime = new Date(end).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${startTime} - ${endTime}`;
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

                {slots.length > 0 && (
                    <Flex
                        $flexWrap="wrap"
                        $gap="var(--space-16)"
                        $alignContent="flex-start"
                    >
                        {slots.map((slot) => (
                            <Button
                                key={slot.id}
                                variant="outlined"
                                size="lg"
                                shape="rounded"
                                color="primary"
                            >
                                {formatTimeRange(slot.startTime, slot.endTime)}
                            </Button>
                        ))}
                    </Flex>
                )}
            </Flex>

            {showAvailability && (
                <AddAvailabilityModal
                    show={showAvailability}
                    onClose={() => setShowAvailability(false)}
                />
            )}
        </>
    );
};
