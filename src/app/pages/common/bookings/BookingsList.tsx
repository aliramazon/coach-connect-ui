import styled from "@emotion/styled";

import { Flex, Typography } from "../../../../design-system";
import type { Booking } from "../../../types/booking";
import { BookingCard } from "./BookingCard";

const EmptyState = styled(Typography)`
    color: var(--gray-500);
`;

interface BookingsListProps {
    bookings: Booking[];
}

export const BookingsList = ({ bookings }: BookingsListProps) => {
    return (
        <Flex
            $flexDirection="row"
            $flexWrap="wrap"
            $gap="var(--space-24)"
            $alignItems="stretch"
        >
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))
            ) : (
                <EmptyState variant="paragraph-md">
                    No bookings found
                </EmptyState>
            )}
        </Flex>
    );
};
