import type { DatePickerProps } from "react-datepicker";
import type { InputSize } from "../Input";

export type Shape = "rounded" | "circle";

export type CustomizedDatePickerProps = DatePickerProps & {
    inputSize?: InputSize;
    shape?: Shape;
};
