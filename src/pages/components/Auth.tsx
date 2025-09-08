import styled from "@emotion/styled";
import { type ReactNode } from "react";
import { Logo, Toaster } from "../../design-system";

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

const AuthContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-48);
    flex-basis: 47rem;
`;

const AuthWrapper: React.FC<AuthWrapperProps> = ({
    pageTitle,

    children,
}) => {
    return (
        <>
            <Wrapper>
                <AuthContent>
                    <Logo layout="vertical" size="lg" customText={pageTitle} />
                    {children}
                </AuthContent>
            </Wrapper>
            <Toaster />
        </>
    );
};

export { AuthWrapper };
