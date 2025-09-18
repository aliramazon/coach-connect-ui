import styled from "@emotion/styled";
import { Button, Typography } from "design-system";

type PageHeaderProps = {
    pageTitle: string;
    actionButtonText?: string;
    actionButtonOnClick?: () => void;
};
const PageHeaderBase = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-32);
    height: 4rem;
`;

const PageHeader: React.FC<PageHeaderProps> = ({
    pageTitle,
    actionButtonText,
    actionButtonOnClick,
}) => {
    return (
        <PageHeaderBase>
            <Typography variant="h6" weight="medium">
                {pageTitle}
            </Typography>
            {actionButtonText && (
                <Button
                    variant="contained"
                    color="primary"
                    size="md"
                    shape="rounded"
                    onClick={actionButtonOnClick}
                >
                    {actionButtonText}
                </Button>
            )}
        </PageHeaderBase>
    );
};

export { PageHeader };
