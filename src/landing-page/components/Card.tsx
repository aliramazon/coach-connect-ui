import styled from "@emotion/styled";
import type { LucideIcon } from "lucide-react";
import React from "react";
import type { BaseCardColor, IconCardColor } from "../../design-system";
import { BaseCard, IconCard, Typography } from "../../design-system";

interface CardProps {
    icon: LucideIcon;
    color: BaseCardColor;
    title: string;
    text: string;
    className?: string;
}

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-48);
    flex-grow: 1;
    align-items: center;
    text-align: center;
    padding-right: var(--space-8);
    padding-left: var(--space-8);
    padding-bottom: var(--space-8);
    padding-top: var(--space-32);
`;

const TextCard = styled(BaseCard)`
    padding: var(--space-16);
    width: 100%;
    flex-grow: 1;

    .card-title {
        margin-bottom: var(--space-16);
    }
`;

export const Card: React.FC<CardProps> = ({
    icon,
    color,
    title,
    text,
    className,
}) => {
    return (
        <BaseCard
            color={color}
            borderRadius="large"
            hasBorder
            hasShadow
            className={className}
        >
            <CardContent>
                <IconCard
                    icon={icon}
                    color={color as IconCardColor}
                    size="md"
                    shape="rounded"
                    hasBorder
                />

                <TextCard borderRadius="large" hasBorder>
                    <Typography
                        variant="h6"
                        weight="semibold"
                        color="neutral-strong"
                        className="card-title"
                    >
                        {title}
                    </Typography>
                    <Typography variant="paragraph-sm" color="neutral">
                        {text}
                    </Typography>
                </TextCard>
            </CardContent>
        </BaseCard>
    );
};
