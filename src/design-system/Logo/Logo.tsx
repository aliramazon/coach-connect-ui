import React from "react";
import { trimWhiteSpaces } from "../utils";
import logo from "./logo.svg";

import "./Logo.css";

type LogoProps = {
    layout: "horizontal" | "vertical";
    size: "lg" | "sm";
    className?: string;
    customText?: string;
};

const layoutClassNames = {
    horizontal: "logo-horizontal",
    vertical: "logo-vertical",
};

const sizeClassNames = {
    lg: "logo-large",
    sm: "logo-small",
};

const Logo: React.FC<LogoProps> = ({ layout, size, customText, className }) => {
    const layoutClassName = layout ? layoutClassNames[layout] : "";
    const sizeClassName = size ? sizeClassNames[size] : "";

    const finalClassNames = trimWhiteSpaces(
        `logo ${layoutClassName} ${sizeClassName} ${className || ""} `
    );
    return (
        <div className={finalClassNames}>
            <img src={logo} alt="Logo" />
            <div className="logo__text">{customText || "CoachConnect"}</div>
        </div>
    );
};

export { Logo };
