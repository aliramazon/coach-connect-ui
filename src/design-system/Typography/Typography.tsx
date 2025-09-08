import React from "react";
import { trimWhiteSpaces } from "../utils";

import {
    alignClassNames,
    colorClassNames,
    variantClassNames,
    weightClassNames,
} from "./classnames";
import { type TypographyProps } from "./types";
import "./Typography.css";

export const Typography: React.FC<TypographyProps> = ({
    variant,
    weight,
    align,
    color,
    className,
    children,
}) => {
    const variantClassName = variantClassNames[variant];
    const weightClassName =
        weight !== undefined ? weightClassNames[weight] : "";

    const alignClassName = align !== undefined ? alignClassNames[align] : "";
    const colorClassName = color !== undefined ? colorClassNames[color] : "";

    const finalClassName = trimWhiteSpaces(
        `typography ${variantClassName} ${weightClassName} ${alignClassName} ${colorClassName} ${
            className || ""
        }`
    );

    if (
        variant === "display-lg" ||
        variant === "display-sm" ||
        variant === "h1"
    ) {
        return <h1 className={finalClassName}>{children}</h1>;
    } else if (variant === "h2") {
        return <h2 className={finalClassName}>{children}</h2>;
    } else if (variant === "h3") {
        return <h3 className={finalClassName}>{children}</h3>;
    } else if (variant === "h4") {
        return <h4 className={finalClassName}>{children}</h4>;
    } else if (variant === "h5") {
        return <h5 className={finalClassName}>{children}</h5>;
    } else if (variant === "h6") {
        return <h6 className={finalClassName}>{children}</h6>;
    } else if (
        variant === "paragraph-lg" ||
        variant === "paragraph-md" ||
        variant === "paragraph-sm" ||
        variant === "subtitle-lg" ||
        variant === "subtitle-md" ||
        variant === "subtitle-sm"
    ) {
        return <p className={finalClassName}>{children}</p>;
    }

    return <h1>{children}</h1>;
};
