import styled from "@emotion/styled";
import { type ReactNode } from "react";
import { BaseCard, Logo, Toaster } from "../../design-system";

type AuthWrapperProps = {
    children: ReactNode;
    pageTitle: string;
    switchLayout?: boolean;
};

const Wrapper = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const AuthContent = styled(BaseCard)`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: var(--space-48);
    flex-basis: 50rem;
    flex-grow: unset;
    padding: var(--space-24);
`;

export const AuthForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

const AuthWrapper: React.FC<AuthWrapperProps> = ({ pageTitle, children }) => {
    return (
        <>
            <Wrapper>
                <AuthContent
                    hasBorder
                    color="primary-x-light"
                    borderRadius="small"
                >
                    <Logo layout="vertical" size="lg" customText={pageTitle} />
                    {children}
                </AuthContent>
            </Wrapper>
            <Toaster />
        </>
    );
};

export { AuthWrapper };
