import type { BadgeColors } from "../../../../design-system/Badge/types";
import type { BookingStatusType } from "../../../types/booking";
import { BookingStatus } from "../../../types/booking";
import { UserRole } from "../../../types/roles";

export const getFullName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`;
};

export const getStatusColor = (status: BookingStatusType): BadgeColors => {
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

export const roleCopy = {
    [UserRole.STUDENT]: {
        phoneCallText: "A call from coach",
        personLabelPrefix: "this coach",
    },
    [UserRole.COACH]: {
        phoneCallText: "A call to student",
        personLabelPrefix: "this student",
    },
    [UserRole.ADMIN]: {
        phoneCallText: "Phone Call",
        personLabelPrefix: null, // Will use personName only
    },
} as const;

export const modalCopy = {
    [BookingStatus.CANCELLED]: {
        title: "Cancel Booking",
        buttonText: "Cancel Booking",
        subtitle: (personLabel: string, bookingTime: string) =>
            `Are you sure you want to cancel your booking with ${personLabel} at ${bookingTime}?`,
    },
    [BookingStatus.NO_SHOW]: {
        title: "Report No Show",
        buttonText: "Report No Show",
        subtitle: (personLabel: string, bookingTime: string) =>
            `Are you sure you want to report no show for your booking with ${personLabel} at ${bookingTime}?`,
    },
} as const;

export const statusOptions = [
    { value: "ALL", label: "All Statuses" },
    { value: BookingStatus.ACTIVE, label: BookingStatus.ACTIVE },
    { value: BookingStatus.COMPLETED, label: BookingStatus.COMPLETED },
    { value: BookingStatus.CANCELLED, label: BookingStatus.CANCELLED },
    {
        value: BookingStatus.NO_SHOW,
        label: BookingStatus.NO_SHOW.replace("_", " "),
    },
];
