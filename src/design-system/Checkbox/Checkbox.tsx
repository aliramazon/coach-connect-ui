import { Check, Minus } from "lucide-react";

import React from "react";
import { Label } from "../Label";
import { type CheckboxProps } from "./types";

import { trimWhiteSpaces } from "../utils";
import "./Checkbox.css";

const shapeClassNames = {
    rounded: "checkbox__custom--rounded",
    circle: "checkbox__custom--circle",
};

const Checkbox: React.FC<CheckboxProps> = ({
    id,
    checked,
    label,
    onChange,
    className,
    shape,
    indeterminate,
    disabled,
    position,
}) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };
    const checkboxWrapperClassName = trimWhiteSpaces(
        `checkbox ${className || ""}`
    );

    const shapeClassName = shape ? shapeClassNames[shape] : "";
    const checkedClassName = checked ? "checkbox__custom--checked" : "";
    const disabledClassName = disabled ? "checkbox__custom--disabled" : "";
    const customCheckboxClassName = trimWhiteSpaces(
        `checkbox__custom ${checkedClassName} ${shapeClassName} ${disabledClassName}`
    );

    const labelClassName = `checkbox__label ${
        position ? "checkbox__label--end" : ""
    }`;

    return (
        <div className={checkboxWrapperClassName}>
            <Label htmlFor={id} className={labelClassName} disabled={disabled}>
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={handleOnChange}
                    className="checkbox__hidden-input"
                    disabled={disabled}
                />
                <div className={customCheckboxClassName}>
                    {checked ? indeterminate ? <Minus /> : <Check /> : null}
                </div>
                {label && <span>{label}</span>}
            </Label>
        </div>
    );
};

export { Checkbox };
