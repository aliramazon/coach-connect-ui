import { format } from "date-fns";

export const formatTimeRange = (start: string, end: string): string => {
    const startTime = format(new Date(start), "h:mm a");
    const endTime = format(new Date(end), "h:mm a");
    return `${startTime} - ${endTime}`;
};

export const formatDate = (dateString: string): string => {
    return format(new Date(dateString), "MMMM d, yyyy");
};
