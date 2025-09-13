import React from "react";
import { trimWhiteSpaces } from "../utils";
import "./Avatar.css";

type AvatarProps = {
    firstName: string;
    lastName: string;
    shape?: "rounded" | "circle";
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
};

const sizeClassNames = {
    sm: "avatar-small",
    md: "avatar-medium",
    lg: "avatar-large",
};

const shapeClassNames = {
    rounded: "avatar-rounded",
    circle: "avatar-circle",
};

const Avatar: React.FC<AvatarProps> = ({
    firstName,
    lastName,
    shape,
    size,
    onClick,
    className,
}) => {
    const sizeClassName = size !== undefined ? sizeClassNames[size] : "";
    const shapeClassName = shape !== undefined ? shapeClassNames[shape] : "";
    const finalClassNames = `avatar ${sizeClassName} ${shapeClassName} $ ${
        className || ""
    }`;

    return (
        <button className={trimWhiteSpaces(finalClassNames)} onClick={onClick}>
            {`${firstName ? firstName[0].toUpperCase() : ""}${
                lastName ? lastName[0].toUpperCase() : ""
            }`}
        </button>
    );
};

export { Avatar };
