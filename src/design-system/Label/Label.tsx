import React from "react";
import "./Label.css";
import { trimWhiteSpaces } from "../utils";

type LabelProps = {
    htmlFor?: string;
    error?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
};

const Label: React.FC<LabelProps> = (props) => {
    const { htmlFor, error, disabled, children, className } = props;

    const errorClassName = error ? "label-error" : "";
    const disabledClassName = disabled ? "label-disabled" : "";

    const finalClassNames = trimWhiteSpaces(
        `label ${className || ""} ${errorClassName} ${disabledClassName} `
    );

    return (
        <label className={finalClassNames} htmlFor={htmlFor}>
            {children}
        </label>
    );
};

export { Label };
