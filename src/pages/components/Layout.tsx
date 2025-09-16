import styled from "@emotion/styled";

const AppLayout = styled.main`
    display: flex;
`;

const AppPage = styled.section`
    height: 100vh;
    flex: 1;
    background-color: var(--jaguar-12);
    padding: var(--space-32);
`;

export const Scrollable = styled.div`
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.4rem;
        border-radius: var(--border-radius-8);
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: var(--border-radius-8);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--jaguar-100);
        border-radius: var(--border-radius-8);
    }
`;

export { AppLayout, AppPage };
