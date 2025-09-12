import {
    type LinearProgressIndicatorProps,
    type LinearProgressShape,
} from "./types";

import { CircleCheck, Info, type LucideIcon } from "lucide-react";
import type { JSX } from "react";
import { Typography } from "../Typography";

const iconNames: {
    [key: string]: {
        [key in LinearProgressShape]: LucideIcon;
    };
} = {
    error: {
        rounded: Info,
        sharp: Info,
    },
    completed: {
        rounded: CircleCheck,
        sharp: CircleCheck,
    },
};

export const LinearProgressIndicator: React.FC<
    LinearProgressIndicatorProps
> = ({ error, value, shape }): JSX.Element => {
    const isCompleted = value === 100;

    let status = "";
    let finalShape: LinearProgressShape = "sharp";
    if (shape) {
        finalShape = shape;
    }
    if (error) {
        status = "error";
    }
    if (isCompleted) {
        status = "completed";
    }

    if (isCompleted || error) {
        const Icon = iconNames[status][finalShape];
        return <Icon className="linear-progress__indicator-icon" />;
    }

    return (
        <Typography
            variant="paragraph-sm"
            weight="medium"
            color="neutral"
            className="linear-progress__indicator-text"
        >
            {value || 0}%
        </Typography>
    );
};
