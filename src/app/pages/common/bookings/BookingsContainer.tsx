import styled from "@emotion/styled";
import { useMemo, useState } from "react";

import {
    DatePicker,
    Flex,
    Select,
    Typography,
} from "../../../../design-system";
import { PageBody } from "../../../components/Layout";
import { PageHeader } from "../../../components/PageHeader";
import { useGetBookings } from "../../../hooks/booking/useGetBookings";
import type { BookingStatusType } from "../../../types/booking";
import { BookingsList } from "./BookingsList";
import { statusOptions } from "./utils";

const FiltersWrapper = styled.div`
    margin-bottom: var(--space-32);
    display: flex;
    gap: var(--space-16);
    align-items: flex-end;
`;

const DatePickerWrapper = styled.div`
    width: 30rem;
`;

const FilterWrapper = styled.div`
    width: 20rem;
`;

export const BookingsContainer = () => {
    // Set today's date (without time) for both minDate and initial selectedDate
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [selectedStatus, setSelectedStatus] = useState<
        BookingStatusType | "ALL" | null
    >(null);
    const { bookings, isLoading, error } = useGetBookings(selectedDate);

    const filteredBookings = useMemo(() => {
        if (!selectedStatus || selectedStatus === "ALL") {
            return bookings;
        }
        return bookings.filter((booking) => booking.status === selectedStatus);
    }, [bookings, selectedStatus]);

    return (
        <>
            <PageHeader pageTitle="Bookings" />
            <PageBody>
                <FiltersWrapper>
                    <DatePickerWrapper>
                        <DatePicker
                            inputSize="md"
                            shape="rounded"
                            label="Select Date"
                            id="bookings-date-picker"
                            placeholderText="Select a date to view bookings"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date as Date)}
                            dateFormat="MMMM d, yyyy"
                        />
                    </DatePickerWrapper>
                    <FilterWrapper>
                        <Select
                            size="md"
                            shape="rounded"
                            label="Filter by Status"
                            options={statusOptions}
                            value={selectedStatus || "ALL"}
                            onSelect={(option) =>
                                setSelectedStatus(
                                    option.value === "ALL"
                                        ? null
                                        : (option.value as BookingStatusType)
                                )
                            }
                            headerPlaceholder="All Statuses"
                        />
                    </FilterWrapper>
                </FiltersWrapper>

                <Flex $flexDirection="column" $gap="var(--space-24)">
                    {isLoading && (
                        <Typography variant="paragraph-md">
                            Loading bookings...
                        </Typography>
                    )}

                    {error && (
                        <Typography variant="paragraph-md" color="error">
                            {error}
                        </Typography>
                    )}

                    {!isLoading && !error && (
                        <BookingsList bookings={filteredBookings} />
                    )}
                </Flex>
            </PageBody>
        </>
    );
};
