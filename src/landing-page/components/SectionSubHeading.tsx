import styled from "@emotion/styled";
import React from "react";
import { Typography } from "../../design-system";

interface SectionSubHeadingProps {
    children: React.ReactNode;
}

const SectionSubHeadingBase = styled(Typography)`
    margin-top: var(--space-12);
    margin-bottom: var(--space-48);
`;

export const SectionSubHeading: React.FC<SectionSubHeadingProps> = ({
    children,
}) => {
    return (
        <SectionSubHeadingBase
            variant="paragraph-lg"
            color="neutral"
            align="center"
        >
            {children}
        </SectionSubHeadingBase>
    );
};
