import React from "react";
import { Label } from "../Label";
import { type RadioProps } from "./types";

import { trimWhiteSpaces } from "../utils";
import "./Radio.css";

const shapeClassNames = {
    rounded: "radio__custom--rounded",
    circle: "radio__custom--circle",
};

const Radio: React.FC<RadioProps> = ({
    id,
    checked,
    name,
    value,
    label,
    onChange,
    className,
    shape,
    disabled,
    position,
}) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    const radioWrapperClassName = trimWhiteSpaces(`radio ${className || ""}`);

    const shapeClassName = shape ? shapeClassNames[shape] : "";
    const checkedClassName = checked ? "radio__custom--checked" : "";
    const disabledClassName = disabled ? "radio__custom--disabled" : "";
    const customRadioClassName = trimWhiteSpaces(
        `radio__custom ${checkedClassName} ${shapeClassName} ${disabledClassName}`
    );

    const labelClassName = `radio__label ${
        position ? "radio__label--end" : ""
    }`;

    return (
        <div className={radioWrapperClassName}>
            <Label htmlFor={id} className={labelClassName} disabled={disabled}>
                <input
                    type="radio"
                    id={id}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={handleOnChange}
                    className="radio__hidden-input"
                    disabled={disabled}
                />
                <div className={customRadioClassName} />
                {label && <span>{label}</span>}
            </Label>
        </div>
    );
};

export { Radio };
