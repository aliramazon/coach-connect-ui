import React from "react";
import { trimWhiteSpaces } from "../utils";
import "./Separator.css";
import type { SeparatorProps } from "./types";

export const Separator: React.FC<SeparatorProps> = ({
    orientation = "horizontal",
    color = "gray",
    className,
}) => {
    const orientationClassName =
        orientation === "horizontal"
            ? "separator-horizontal"
            : "separator-vertical";
    const colorClassName = `separator-${color}`;

    const finalClassName = trimWhiteSpaces(
        `separator ${orientationClassName} ${colorClassName} ${className || ""}`
    );

    return <div className={finalClassName} />;
};
