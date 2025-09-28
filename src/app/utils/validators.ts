export type DateField = { value: Date | null; error: string };

export type CreateSlotForm = {
    date: DateField;
    startTime: DateField;
    endTime: DateField;
};

export const hasFieldValue = (field: DateField) => {
    if (!field.value) {
        return "Field is required";
    }

    return "";
};

export const validateStartAndEndDatesOrder = (
    startDate: Date,
    endDate: Date
) => {
    const errors: { startTime: string; endTime: string } = {
        startTime: "",
        endTime: "",
    };

    if (startDate >= endDate) {
        errors.startTime = "Start time must be before end time";
        errors.endTime = "End time must be after start time";
    }

    return errors;
};
