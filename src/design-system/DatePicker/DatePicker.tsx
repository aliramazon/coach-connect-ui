import { getDate } from "date-fns";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { trimWhiteSpaces } from "../utils";

import { CalendarClock, CalendarDays, Clock } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "../Label";
import "./DatePicker.css";
import type { CustomizedDatePickerProps } from "./types";

const inputSizeClassNames = {
    sm: "input-small",
    md: "input-medium",
    lg: "input-large",
};

const calendarIconClassNames = {
    sm: "customized-date-picker__calendar-icon--sm",
    md: "customized-date-picker__calendar-icon--md",
    lg: "customized-date-picker__calendar-icon--lg",
};

const shapeClassNames = {
    input: {
        rounded: "input-rounded",
        circle: "input-circle",
    },
    datePicker: {
        rounded: "customized-date-picker--rounded",
        circle: "customized-date-picker--circle",
    },
};

const DatePicker: React.FC<CustomizedDatePickerProps> = ({
    inputSize,
    shape,
    label,
    id,
    showTimeSelectOnly,
    showTimeSelect,
    timeCaption,
    hintMessage,
    disabled,
    error,
    ...rest
}) => {
    const [focused, setFocused] = useState(false);
    const customizeDay = (_: Date) => "customized-date-picker__day-wrapper";

    const renderDayContents = (_: number, date: Date) => (
        <div className="customized-date-picker__day">{getDate(date)}</div>
    );

    const inputSizeClassName = inputSize ? inputSizeClassNames[inputSize] : "";
    const inputShapeClassName = shape ? shapeClassNames.input[shape] : "";
    const calendarShapeClassName = shape
        ? shapeClassNames.datePicker[shape]
        : "";
    const calendarIconClassName = inputSize
        ? calendarIconClassNames[inputSize]
        : "";
    const errorClassName = error ? "input-error" : "";
    const finalInputClassNames = trimWhiteSpaces(
        `customized-date-picker__input input ${errorClassName} ${inputSizeClassName} ${inputShapeClassName}`
    );

    const finalCalendarClassNames = trimWhiteSpaces(
        `customized-date-picker ${calendarShapeClassName} ${
            inputSize === "lg" ? "customized-date-picker--lg" : ""
        }`
    );

    const finalCalendarIconClassNames = trimWhiteSpaces(
        `customized-date-picker__calendar-icon ${calendarIconClassName} ${
            error ? "customized-date-picker__calendar-icon--error" : ""
        } ${focused ? "customized-date-picker__calendar-icon--focus" : ""}`
    );
    const hintMessageClass = trimWhiteSpaces(
        `input-hintMessage ${error ? "input-hintMessage--error" : ""} ${
            disabled ? "input-hintMessage--disabled" : ""
        }`
    );

    const onFocus = () => {
        setFocused(true);
    };
    const onBlur = () => {
        setFocused(false);
    };

    let Icon = CalendarDays;
    if (showTimeSelectOnly && showTimeSelect) {
        Icon = Clock;
    } else if (showTimeSelect) {
        Icon = CalendarClock;
    }

    const datePicker = (
        <ReactDatePicker
            {...rest}
            className={finalInputClassNames}
            dayClassName={customizeDay}
            renderDayContents={renderDayContents}
            calendarClassName={finalCalendarClassNames}
            showIcon
            icon={<Icon className={finalCalendarIconClassNames} />}
            toggleCalendarOnIconClick
            showTimeSelectOnly={showTimeSelectOnly}
            showTimeSelect={showTimeSelect}
            id={id}
            timeCaption={timeCaption}
            fixedHeight
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );

    return label ? (
        <div className="input-control">
            <Label htmlFor={id}>{label}</Label>
            {datePicker}

            {hintMessage ? (
                <span className={hintMessageClass}>{hintMessage}</span>
            ) : null}
        </div>
    ) : (
        datePicker
    );
};

export { DatePicker };
