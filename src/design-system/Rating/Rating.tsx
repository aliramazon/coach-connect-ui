import { Star } from "lucide-react";
import React, { useState } from "react";
import { trimWhiteSpaces } from "../utils";
import "./Rating.css";
import type { RatingProps } from "./types";

const sizeClassNames = {
    sm: "rating--sm",
    md: "rating--md",
    lg: "rating--lg",
};

const Rating: React.FC<RatingProps> = ({
    value,
    max = 5,
    className,
    size = "md",
    onSelect,
}) => {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const sizeClassName = sizeClassNames[size];
    const hasValue = value !== undefined && value !== null;
    const isInteractive = onSelect ? true : false;

    const finalClassName = trimWhiteSpaces(
        `rating ${sizeClassName} ${
            isInteractive ? "rating--interactive" : ""
        } ${className || ""}`
    );

    const hasValueClassName = hasValue ? "rating__star--has-value" : "";

    const getStarClassName = (starNumber: number) => {
        const isFilled = hasValue && starNumber <= value!;
        const isHovered = hoveredStar !== null && starNumber <= hoveredStar;
        const filledClassName = isFilled ? "rating__star--filled" : "";
        const hoveredClassName = isHovered ? "rating__star--hovered" : "";

        return trimWhiteSpaces(
            `rating__star ${filledClassName} ${hasValueClassName} ${hoveredClassName}`
        );
    };

    const handleStarClick = (starNumber: number) => {
        if (onSelect) {
            onSelect(starNumber);
        }
    };

    const handleStarMouseEnter = (starNumber: number) => {
        if (isInteractive) {
            setHoveredStar(starNumber);
        }
    };

    const handleStarMouseLeave = () => {
        if (isInteractive) {
            setHoveredStar(null);
        }
    };

    return (
        <div className={finalClassName}>
            {Array.from({ length: max }, (_, index) => {
                const starNumber = index + 1;
                const starClassName = getStarClassName(starNumber);

                return (
                    <Star
                        key={starNumber}
                        className={starClassName}
                        onClick={() => handleStarClick(starNumber)}
                        onMouseEnter={() => handleStarMouseEnter(starNumber)}
                        onMouseLeave={handleStarMouseLeave}
                    />
                );
            })}
        </div>
    );
};

export { Rating };
