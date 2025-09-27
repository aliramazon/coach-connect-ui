import type { DatePickerProps } from "react-datepicker";
import type { InputShape, InputSize } from "../Input";

export type CustomizedDatePickerProps = DatePickerProps & {
    inputSize?: InputSize;
    shape?: InputShape;
    label?: string;
    id?: string;
    error?: boolean;
    hintMessage?: string;
    disabled?: boolean;
};
