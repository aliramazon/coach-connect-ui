import styled from "@emotion/styled";
import React from "react";
import { Flex, Typography } from "../../design-system";

const HeroContainer = styled.section`
    padding: var(--space-64) var(--space-32);
    background: linear-gradient(135deg, var(--violet-50) 0%, var(--white) 100%);
    text-align: center;
`;

const HeroContent = styled.div`
    max-width: 117rem;
    width: 100%;
    margin: 0 auto;

    .hero-description {
        max-width: 600px;
    }
`;

export const HeroSection: React.FC = () => {
    return (
        <HeroContainer>
            <HeroContent>
                <Flex
                    $flexDirection="column"
                    $gap="var(--space-24)"
                    $alignItems="center"
                >
                    <Typography
                        variant="h3"
                        weight="bold"
                        color="neutral-strong"
                    >
                        Connect with Expert Coaches
                    </Typography>
                    <Typography
                        variant="paragraph-lg"
                        color="neutral"
                        className="hero-description"
                    >
                        Book one-on-one coaching sessions, manage your schedule,
                        and achieve your goals with personalized guidance from
                        experienced professionals.
                    </Typography>
                </Flex>
            </HeroContent>
        </HeroContainer>
    );
};
