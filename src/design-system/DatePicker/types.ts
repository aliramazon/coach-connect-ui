import type { DatePickerProps } from "react-datepicker";
import type { InputSize } from "../Input";

export type Shape = "rounded" | "circle";

export type CustomizedDatePickerProps = Omit<
    DatePickerProps,
    "selectsRange" | "selectsMultiple"
> & {
    inputSize?: InputSize;
    shape?: Shape;
    selectsRange?: boolean;
    selectsMultiple?: boolean;
    placeholder?: string;
};
