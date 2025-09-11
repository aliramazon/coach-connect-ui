import React from "react";
import { trimWhiteSpaces } from "../utils";
import "./Badge.css";
import { type BadgeProps } from "./types";

const shapeClassNames = {
    rounded: "badge-rounded",
    circle: "badge-circle",
};

const variantClassNames = {
    contained: "badge-contained",
    outlined: "badge-outlined",
};

const colorClassNames = {
    primary: "badge-primary",
    orange: "badge-orange",
    green: "badge-green",
    red: "badge-red",
    gray: "badge-gray",
};

const Badge: React.FC<BadgeProps> = ({
    label,
    color,
    shape,
    variant,
    status,
    icon: Icon,
    className,
}) => {
    const shapeClassName = shape !== undefined ? shapeClassNames[shape] : "";

    const colorClassName = color !== undefined ? colorClassNames[color] : "";

    const variantClassName =
        variant !== undefined ? variantClassNames[variant] : "";

    const finalClassNames = `badge ${colorClassName}  ${shapeClassName} ${variantClassName} ${
        className || ""
    }`;

    return (
        <div className={trimWhiteSpaces(finalClassNames)}>
            {!status && Icon ? <Icon /> : null}
            {status && !Icon ? <div className="badge__status" /> : null}
            <span className="badge__text">{label}</span>
        </div>
    );
};

export { Badge };
