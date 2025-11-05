import styled from "@emotion/styled";
import {
    LucideCalendarCheck,
    LucideClock,
    LucidePhone,
    LucideVideo,
} from "lucide-react";

import {
    Avatar,
    Badge,
    type BadgeColors,
    BaseCard,
    Button,
    Flex,
    Separator,
    Typography,
} from "../../../../design-system";
import { useUserStore } from "../../../store/useUserStore";
import type { Booking } from "../../../types/booking";
import { BookingStatus, BookingType } from "../../../types/booking";
import { UserRole } from "../../../types/roles";
import { formatDate, formatTimeRange } from "../../../utils/time-formatters";
import { IconTextItem } from "./IconTextItem";

const StyledBookingCard = styled(BaseCard)`
    padding: var(--space-24);
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    width: calc((100% - var(--space-24)) / 2);
    flex-grow: 0;
`;

const BookingHeader = styled(Flex)`
    align-items: center;
    gap: var(--space-16);
`;

interface BookingCardProps {
    booking: Booking;
}

const getStatusColor = (status: BookingStatus): BadgeColors => {
    switch (status) {
        case BookingStatus.ACTIVE:
            return "primary";
        case BookingStatus.COMPLETED:
            return "green";
        case BookingStatus.CANCELLED:
            return "red";
        case BookingStatus.NO_SHOW:
            return "orange";
        default:
            return "gray";
    }
};

const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
};

export const BookingCard = ({ booking }: BookingCardProps) => {
    const { getEffectiveUser } = useUserStore();
    const effectiveUser = getEffectiveUser();
    const currentUserRole = effectiveUser?.role;

    const person = booking.coach || booking.student;
    if (!person) return null;

    const phoneNumber =
        booking.coach?.phoneNumber || booking.student?.phoneNumber;

    const getPhoneCallText = () => {
        if (currentUserRole === UserRole.STUDENT) {
            return "A call from coach";
        }
        if (currentUserRole === UserRole.COACH) {
            return "A call to student";
        }
        // ADMIN view - show generic text or could be customized
        return "Phone Call";
    };

    return (
        <StyledBookingCard
            borderRadius="medium"
            hasBorder
            hasShadow
            color="primary-x-light"
        >
            <BookingHeader>
                <Avatar
                    firstName={person.firstName}
                    lastName={person.lastName}
                    shape="circle"
                    size="lg"
                />
                <Flex $flexDirection="column" $gap="var(--space-2)" $flex="1">
                    <Typography
                        variant="paragraph-lg"
                        color="neutral-strong"
                        weight="bold"
                    >
                        {getFullName(person.firstName, person.lastName)}
                    </Typography>
                    <Typography variant="subtitle-lg">
                        {person.email}
                    </Typography>
                </Flex>
                <Badge
                    label={booking.status}
                    color={getStatusColor(booking.status)}
                    shape="rounded"
                />
            </BookingHeader>
            <Separator color="light" />
            <Flex $flexDirection="row" $columnGap="var(--space-24)">
                <IconTextItem
                    icon={LucideCalendarCheck}
                    text={formatDate(booking.slot.startTime)}
                />
                <IconTextItem
                    icon={LucideClock}
                    text={formatTimeRange(
                        booking.slot.startTime,
                        booking.slot.endTime
                    )}
                />
            </Flex>
            <Separator color="light" />
            <IconTextItem
                icon={
                    booking.type === BookingType.PHONE_CALL
                        ? LucidePhone
                        : LucideVideo
                }
                text={
                    booking.type === BookingType.PHONE_CALL
                        ? getPhoneCallText()
                        : "Video Call"
                }
                rightElement={
                    booking.type === BookingType.PHONE_CALL ? (
                        <Button
                            variant="text"
                            color="primary"
                            size="sm"
                            shape="circle"
                        >
                            {phoneNumber}
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            color="primary"
                            size="sm"
                            shape="circle"
                            renderAs="link"
                            navigateTo=""
                        >
                            Join Meeting
                        </Button>
                    )
                }
            />
        </StyledBookingCard>
    );
};
