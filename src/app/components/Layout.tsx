import styled from "@emotion/styled";

const AppLayout = styled.main`
    display: flex;
    height: 100vh;
`;

const AppPage = styled.section`
    flex: 1;
    background-color: var(--jaguar-12);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const PageBody = styled.div`
    padding-top: var(--space-16);
    padding-bottom: var(--space-32);
    padding-left: var(--space-32);
    padding-right: var(--space-32);
`;

const Scrollable = styled.div`
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

export { AppLayout, AppPage, PageBody, Scrollable };
