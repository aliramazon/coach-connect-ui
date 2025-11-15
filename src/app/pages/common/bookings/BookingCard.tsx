import styled from "@emotion/styled";
import {
    LucideCalendarCheck,
    LucideClock,
    LucideFileText,
    LucideListTodo,
    LucidePhone,
    LucideVideo,
} from "lucide-react";
import { useState } from "react";

import {
    Avatar,
    Badge,
    BaseCard,
    Button,
    CenteredModal,
    Flex,
    Menu,
    Separator,
    Typography,
} from "../../../../design-system";
import { useUpdateBookingStatus } from "../../../hooks/booking/useUpdateBookingStatus";
import { useUserStore } from "../../../store/useUserStore";
import type { Booking } from "../../../types/booking";
import { BookingStatus, BookingType } from "../../../types/booking";
import { UserRole } from "../../../types/roles";
import { formatDate, formatTimeRange } from "../../../utils/time-formatters";
import { AddOrUpdateNoteModal } from "./AddOrUpdateNoteModal";
import { IconTextItem } from "./IconTextItem";
import { getFullName, getStatusColor, modalCopy, roleCopy } from "./utils";

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

export const BookingCard = ({ booking }: BookingCardProps) => {
    const { getEffectiveUser } = useUserStore();
    const effectiveUser = getEffectiveUser();
    const currentUserRole = effectiveUser?.role;

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState<
        typeof BookingStatus.CANCELLED | typeof BookingStatus.NO_SHOW | null
    >(null);

    const { updateStatus, isSubmitting } = useUpdateBookingStatus({
        onSuccess: () => {
            setShowConfirmModal(false);
            setSelectedAction(null);
        },
        onError: () => {
            setShowConfirmModal(false);
            setSelectedAction(null);
        },
    });

    const person = booking.coach || booking.student;
    if (!person) return null;

    const phoneNumber =
        booking.coach?.phoneNumber || booking.student?.phoneNumber;
    const personName = getFullName(person.firstName, person.lastName);
    const bookingTime = formatTimeRange(
        booking.slot.startTime,
        booking.slot.endTime
    );

    const roleCopyForUser =
        roleCopy[currentUserRole || UserRole.ADMIN] || roleCopy[UserRole.ADMIN];
    const phoneCallText = roleCopyForUser.phoneCallText;
    const personLabel = roleCopyForUser.personLabelPrefix
        ? `${roleCopyForUser.personLabelPrefix}, ${personName}`
        : personName;

    const handleMenuSelect = (value: string) => {
        if (value === "add-or-update-note") {
            setShowNoteModal(true);
        } else if (
            value === BookingStatus.CANCELLED ||
            value === BookingStatus.NO_SHOW
        ) {
            setSelectedAction(value);
            setShowConfirmModal(true);
        }
    };

    const handleConfirm = () => {
        if (selectedAction) {
            updateStatus(booking.id, selectedAction);
        }
    };

    const handleCloseModal = () => {
        setShowConfirmModal(false);
        setSelectedAction(null);
    };

    const isStudent = currentUserRole === UserRole.STUDENT;
    const isCoach = currentUserRole === UserRole.COACH;

    const hasNotes =
        booking.review &&
        ((isStudent &&
            "studentNotes" in booking.review &&
            booking.review.studentNotes) ||
            (isCoach &&
                "coachNotes" in booking.review &&
                booking.review.coachNotes));

    let notes: string | undefined;
    if (booking.review) {
        if (
            isStudent &&
            "studentNotes" in booking.review &&
            booking.review.studentNotes
        ) {
            notes = booking.review.studentNotes;
        } else if (
            isCoach &&
            "coachNotes" in booking.review &&
            booking.review.coachNotes
        ) {
            notes = booking.review.coachNotes;
        }
    }

    const getMenuOptions = () => {
        const options = [
            {
                label: hasNotes ? "Update Note" : "Add Note",
                value: "add-or-update-note",
            },
        ];

        if (booking.status === BookingStatus.ACTIVE) {
            options.push(
                {
                    label: "Cancel",
                    value: BookingStatus.CANCELLED,
                },
                {
                    label: "Report no show",
                    value: BookingStatus.NO_SHOW,
                }
            );
        }

        return options;
    };

    const menuOptions = getMenuOptions();

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
                    variant="contained"
                />

                <Menu
                    options={menuOptions}
                    onSelect={handleMenuSelect}
                    orientation="vertical"
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
            {booking.agenda && (
                <>
                    <Separator color="light" />
                    <IconTextItem
                        icon={LucideListTodo}
                        text={`Agenda: ${booking.agenda}`}
                    />
                </>
            )}
            {notes && (
                <>
                    <Separator color="light" />
                    <IconTextItem
                        icon={LucideFileText}
                        text={`Notes: ${notes}`}
                    />
                </>
            )}
            <Separator color="light" />
            <IconTextItem
                icon={
                    booking.type === BookingType.PHONE_CALL
                        ? LucidePhone
                        : LucideVideo
                }
                text={
                    booking.type === BookingType.PHONE_CALL
                        ? phoneCallText
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

            {showNoteModal && (
                <AddOrUpdateNoteModal
                    show={showNoteModal}
                    onClose={() => setShowNoteModal(false)}
                    booking={booking}
                />
            )}

            {showConfirmModal && selectedAction && (
                <CenteredModal
                    show={showConfirmModal}
                    showCloseIcon
                    onClose={handleCloseModal}
                    title={modalCopy[selectedAction].title}
                    subtitle={modalCopy[selectedAction].subtitle(
                        personLabel,
                        bookingTime
                    )}
                    primaryActionButton={{
                        text: modalCopy[selectedAction].buttonText,
                        onClick: handleConfirm,
                        disabled: isSubmitting,
                        loading: isSubmitting,
                        color: "danger",
                    }}
                    secondaryActionButton={{
                        text: "Close",
                        onClick: handleCloseModal,
                    }}
                />
            )}
        </StyledBookingCard>
    );
};
