import styled from "@emotion/styled";
import { Button, Typography } from "design-system";
import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
    pageTitle: string;
    actionButtonText?: string;
    actionButtonOnClick?: () => void;
    actionButtonIcon?: LucideIcon;
};
const PageHeaderBase = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8rem;
    flex: 0 0 8rem;
    position: sticky;
    top: 0;
    background-color: var(--white);
    padding: 0 var(--space-32);
`;

const PageHeader: React.FC<PageHeaderProps> = ({
    pageTitle,
    actionButtonText,
    actionButtonOnClick,
    actionButtonIcon: Icon,
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
                    startIcon={Icon}
                >
                    {actionButtonText}
                </Button>
            )}
        </PageHeaderBase>
    );
};

export { PageHeader };
