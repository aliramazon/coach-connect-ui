import styled from "@emotion/styled";
import { useState } from "react";
import {
    Avatar,
    BaseCard,
    Button,
    Flex,
    Typography,
} from "../../../design-system";
import { PageBody } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { useCoachesSlots } from "../../hooks/coaches-slots/useCoachesSlots";
import { SlotStatus } from "../../types/slot";
import { formatTimeRange } from "../../utils/time-formatters";

const CoachCard = styled(BaseCard)`
    padding: var(--space-24);
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
`;

const CoachHeader = styled(Flex)`
    align-items: center;
    gap: var(--space-16);
`;

const EmptyState = styled(Typography)`
    color: var(--gray-500);
`;

export const Coaches = () => {
    const [selectedDate] = useState<Date>(new Date());
    const { coaches, isLoading, error } = useCoachesSlots(selectedDate);

    const getCoachFullName = (firstName: string, lastName: string) => {
        return `${firstName} ${lastName}`;
    };

    return (
        <>
            <PageHeader pageTitle="Coaches" />
            <PageBody>
                <Flex $flexDirection="column" $gap="var(--space-24)">
                    {isLoading && (
                        <Typography variant="paragraph-md">
                            Loading coaches availability...
                        </Typography>
                    )}

                    {error && (
                        <Typography variant="paragraph-md" color="error">
                            {error}
                        </Typography>
                    )}

                    {!isLoading && !error && (
                        <Flex
                            $flexDirection="column"
                            $gap="var(--space-24)"
                            $width="100%"
                        >
                            {coaches.length > 0 ? (
                                coaches.map((coach) => (
                                    <CoachCard
                                        key={coach.id}
                                        borderRadius="medium"
                                        hasBorder
                                        hasShadow
                                        color="primary-x-light"
                                    >
                                        <CoachHeader>
                                            <Avatar
                                                firstName={coach.firstName}
                                                lastName={coach.lastName}
                                                shape="circle"
                                                size="lg"
                                            />
                                            <Flex
                                                $flexDirection="column"
                                                $gap="var(--space-2)"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    color="neutral-strong"
                                                >
                                                    {getCoachFullName(
                                                        coach.firstName,
                                                        coach.lastName
                                                    )}
                                                </Typography>
                                            </Flex>
                                        </CoachHeader>

                                        {coach.coachSlots.length > 0 ? (
                                            <>
                                                <Flex
                                                    $flexWrap="wrap"
                                                    $gap="var(--space-16)"
                                                    $width="100%"
                                                >
                                                    {coach.coachSlots.map(
                                                        (slot) => (
                                                            <Button
                                                                key={slot.id}
                                                                variant="outlined"
                                                                size="sm"
                                                                shape="rounded"
                                                                color="secondary"
                                                                disabled={
                                                                    slot.status ===
                                                                    SlotStatus.UNAVILABLE
                                                                }
                                                            >
                                                                {formatTimeRange(
                                                                    slot.startTime,
                                                                    slot.endTime
                                                                )}
                                                            </Button>
                                                        )
                                                    )}
                                                </Flex>
                                            </>
                                        ) : (
                                            <EmptyState variant="paragraph-md">
                                                No availability for this date
                                            </EmptyState>
                                        )}
                                    </CoachCard>
                                ))
                            ) : (
                                <EmptyState variant="paragraph-md">
                                    No coaches available for this date
                                </EmptyState>
                            )}
                        </Flex>
                    )}
                </Flex>
            </PageBody>
        </>
    );
};
