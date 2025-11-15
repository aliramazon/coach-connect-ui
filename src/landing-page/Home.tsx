import styled from "@emotion/styled";
import React from "react";
import { LandingNav } from "./LandingNav";

import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { HeroSection } from "./sections/HeroSection";

const LandingPageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const LandingPageContent = styled.main`
    flex: 1;
`;

export const Home: React.FC = () => {
    return (
        <LandingPageContainer>
            <LandingNav />
            <LandingPageContent>
                <HeroSection />
                <FeaturesSection />
            </LandingPageContent>
        </LandingPageContainer>
    );
};
