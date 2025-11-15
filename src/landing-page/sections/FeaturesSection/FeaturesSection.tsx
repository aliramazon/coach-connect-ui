import styled from "@emotion/styled";
import React from "react";
import {
    Card,
    Container,
    SectionBase,
    SectionHeading,
    SectionSubHeading,
} from "../../components";
import { data } from "./data";

const FeaturesBase = styled(SectionBase)`
    background-color: var(--white);
`;

const FeatureCards = styled.div`
    display: flex;
    gap: var(--space-32);
    flex-wrap: wrap;

    .featureCard {
        flex-basis: calc((100% - var(--space-64)) / 3);
        min-width: 280px;
        flex-grow: 1;
    }
`;

export const FeaturesSection: React.FC = () => {
    return (
        <FeaturesBase>
            <Container>
                <SectionHeading>Why Choose Coach Connect?</SectionHeading>
                <SectionSubHeading>
                    Our platform provides simple yet effective coaching
                    management for students and coaches.
                </SectionSubHeading>

                <FeatureCards>
                    {data.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                icon={item.data.icon}
                                color={item.color}
                                title={item.data.title}
                                text={item.data.text}
                                className="featureCard"
                            />
                        );
                    })}
                </FeatureCards>
            </Container>
        </FeaturesBase>
    );
};
