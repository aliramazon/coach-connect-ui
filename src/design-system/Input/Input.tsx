import React from "react";
import { Icon } from "../Icon";
import { Label } from "../Label";
import { trimWhiteSpaces } from "../utils";
import "./Input.css";
import { type InputProps } from "./types";

const sizeClassNames = {
    sm: "input-small",
    md: "input-medium",
    lg: "input-large",
};

const shapeClassNames = {
    rounded: "input-rounded",
    circle: "input-circle",
};

const Input: React.FC<InputProps> = (props) => {
    const {
        type,
        error,
        disabled,
        placeholder,
        shape,
        size,
        hintMessage,
        label,
        className,
        id,
        onChange,
        value,
        clearable,
        iconName,
        autoFocus,
    } = props;

    const sizeClassName = size !== undefined ? sizeClassNames[size] : "";

    const shapeClassName = shape !== undefined ? shapeClassNames[shape] : "";

    const errorClassName = error ? "input-error" : "";
    const textareaClassName = type === "textarea" ? "input-textarea" : "";
    const clearableClassName = clearable ? "input-clearable" : "";

    const finalClassNames = trimWhiteSpaces(
        `input ${sizeClassName} ${shapeClassName} ${errorClassName} ${textareaClassName} ${clearableClassName}`
    );

    const hintMessageClass = trimWhiteSpaces(
        `input-hintMessage ${error ? "input-hintMessage--error" : ""} ${
            disabled ? "input-hintMessage--disabled" : ""
        }`
    );

    const handleOnChange = (
        e:
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLInputElement>
    ) => {
        onChange(e.target.value);
    };

    const clearInput = () => {
        onChange("");
    };

    return (
        <div className={`input-control ${className || ""} `}>
            {label ? (
                <Label htmlFor={id} disabled={disabled} error={error}>
                    {label}
                </Label>
            ) : null}
            <div className="input-base">
                {type === "textarea" ? (
                    <textarea
                        placeholder={placeholder}
                        className={finalClassNames}
                        disabled={disabled}
                        id={id}
                        onChange={handleOnChange}
                        value={value}
                        autoFocus={autoFocus}
                    />
                ) : (
                    <input
                        className={finalClassNames}
                        type={type || "text"}
                        placeholder={placeholder}
                        disabled={disabled}
                        id={id}
                        onChange={handleOnChange}
                        value={value}
                        autoFocus={autoFocus}
                    />
                )}
                {clearable && value.length > 0 && (
                    <Icon
                        iconName="x-in-circle"
                        className="input-clearIcon"
                        onClick={clearInput}
                    />
                )}
            </div>

            {hintMessage ? (
                <span className={hintMessageClass}>{hintMessage}</span>
            ) : null}
        </div>
    );
};

export { Input };
