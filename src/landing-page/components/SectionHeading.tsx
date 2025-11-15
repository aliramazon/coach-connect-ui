import React from "react";
import { Typography } from "../../design-system";

interface SectionHeadingProps {
    children: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
    return (
        <Typography
            variant="h4"
            weight="bold"
            color="neutral-strong"
            align="center"
        >
            {children}
        </Typography>
    );
};
