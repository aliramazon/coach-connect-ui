import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "../design-system";

const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-24) var(--space-32);
    background-color: var(--white);
    border-bottom: 1px solid var(--jaguar-100);
    position: sticky;
    top: 0;
    z-index: 100;
`;

const NavContent = styled.div`
    max-width: 117rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const LandingNav: React.FC = () => {
    return (
        <NavContainer>
            <NavContent>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Logo layout="horizontal" size="sm" />
                </Link>
                <Button
                    variant="contained"
                    color="primary"
                    size="md"
                    shape="rounded"
                    navigateTo="/login"
                    renderAs="link"
                >
                    Login
                </Button>
            </NavContent>
        </NavContainer>
    );
};
