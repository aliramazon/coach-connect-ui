import React from "react";
import "./Avatar.css";
import { trimWhiteSpaces } from "../utils";

type AvatarProps = {
    firstName: string;
    lastName: string;
    shape?: "rounded" | "circle";
    size?: "sm" | "md" | "lg";
    imageUrl?: string;
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
    imageUrl,
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
            {imageUrl ? (
                <img src={imageUrl} alt={`${firstName} ${lastName}`} />
            ) : (
                `${firstName ? firstName[0].toUpperCase() : ""}${
                    lastName ? lastName[0].toUpperCase() : ""
                }`
            )}
        </button>
    );
};

export { Avatar };
