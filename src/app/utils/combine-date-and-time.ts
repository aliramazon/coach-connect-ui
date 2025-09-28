export const combineDateAndTime = (datePart: Date, timePart: Date): Date => {
    return new Date(
        datePart.getFullYear(),
        datePart.getMonth(),
        datePart.getDate(),
        timePart.getHours(),
        timePart.getMinutes(),
        0,
        0
    );
};
