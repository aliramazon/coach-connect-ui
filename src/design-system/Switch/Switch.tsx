import React from "react";
import { trimWhiteSpaces } from "../utils";
import "./Switch.css";
import { Icon } from "../Icon";
import { Label } from "../Label";

const shapeClassNames = {
    rounded: "switch-rounded",
    circle: "switch-circle",
};

type SwitchShape = "rounded" | "circle";
interface ToggleProps {
    checked: boolean;
    disabled?: boolean;
    className?: string;
    shape?: SwitchShape;
    onSwitch: (value: boolean) => void;
    label?: string;
    id: string;
    position?: "end";
}

const Switch: React.FC<ToggleProps> = ({
    checked,
    onSwitch,
    disabled,
    shape,
    className,
    id,
    label,
    position,
}) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSwitch(e.target.checked);
    };

    const shapeClassName = shape ? shapeClassNames[shape] : "";

    const trackClassNames = trimWhiteSpaces(
        `switch__track ${shapeClassName} ${checked ? "switch-on" : ""} 
        ${className ? className : ""}`
    );

    const labelClassName = `switch__label ${
        position ? "switch__label--end" : ""
    }`;

    return (
        <Label htmlFor={id} className={labelClassName} disabled={disabled}>
            <input
                type="checkbox"
                className="switch__hidden-input"
                onChange={handleOnChange}
                id={id}
                disabled={disabled}
                checked={checked}
            />
            <div className={trackClassNames}>
                <div className="switch__thumb">
                    {checked && (
                        <Icon
                            iconName={!shape ? "check-sharp" : "check"}
                            className="switch__icon"
                        />
                    )}
                </div>
            </div>
            {label && <span>{label}</span>}
        </Label>
    );
};

export { Switch };
