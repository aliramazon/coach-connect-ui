import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Flex, IconCard, Typography } from "../../../../design-system";

interface IconTextItemProps {
    icon: LucideIcon;
    text: string;
    rightElement?: ReactNode;
}

export const IconTextItem = ({
    icon,
    text,
    rightElement,
}: IconTextItemProps) => {
    return (
        <Flex
            $flexDirection="row"
            $columnGap="var(--space-12)"
            $alignItems="center"
        >
            <IconCard
                size="xs"
                icon={icon}
                shape="rounded"
                color="primary-light"
            />
            <Flex $flex={rightElement ? "1" : undefined}>
                <Typography
                    variant="paragraph-sm"
                    weight="medium"
                    color="neutral-strong"
                >
                    {text}
                </Typography>
            </Flex>
            {rightElement}
        </Flex>
    );
};
