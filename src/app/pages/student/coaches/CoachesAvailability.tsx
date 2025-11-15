import styled from "@emotion/styled";
import type { BadgeColors } from "../../../../design-system";
import {
    Avatar,
    Badge,
    BaseCard,
    Button,
    Flex,
    Separator,
    Typography,
} from "../../../../design-system";
import type { CoachWithSlots } from "../../../services/coaches-slots/get-all";
import type { Slot } from "../../../types/slot";
import { SlotStatus } from "../../../types/slot";
import { formatTimeRange } from "../../../utils/time-formatters";

const CoachCard = styled(BaseCard)`
    padding: var(--space-24);
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    width: calc((100% - var(--space-24)) / 2);
    flex-grow: 0;
`;

const CoachHeader = styled(Flex)`
    align-items: center;
    gap: var(--space-16);
`;

const CoachNameContainer = styled(Flex)`
    align-items: center;
    gap: var(--space-8);
`;

const EmptyState = styled(Typography)`
    color: var(--gray-500);
`;

interface CoachesAvailabilityProps {
    coaches: CoachWithSlots[];
    onSlotClick: (slot: Slot, coach: CoachWithSlots) => void;
}

const getRatingBadgeColor = (rating: number | null): BadgeColors => {
    if (rating === null) {
        return "gray";
    }
    if (rating >= 4.5) {
        return "green";
    }
    if (rating >= 3.5) {
        return "primary";
    }
    if (rating >= 2.5) {
        return "orange";
    }
    return "red";
};

const formatRating = (rating: number | null): string => {
    if (rating === null) {
        return "N/A";
    }
    return rating.toFixed(1);
};

export const CoachesAvailability = ({
    coaches,
    onSlotClick,
}: CoachesAvailabilityProps) => {
    const getCoachFullName = (firstName: string, lastName: string) => {
        return `${firstName} ${lastName}`;
    };

    return (
        <Flex
            $flexDirection="row"
            $flexWrap="wrap"
            $gap="var(--space-24)"
            $alignItems="stretch"
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
                            <Flex $flexDirection="column" $gap="var(--space-2)">
                                <CoachNameContainer>
                                    <Typography
                                        variant="paragraph-lg"
                                        color="neutral-strong"
                                        weight="bold"
                                    >
                                        {getCoachFullName(
                                            coach.firstName,
                                            coach.lastName
                                        )}
                                    </Typography>
                                    {coach.averageRating !== null && (
                                        <Badge
                                            label={formatRating(
                                                coach.averageRating
                                            )}
                                            color={getRatingBadgeColor(
                                                coach.averageRating
                                            )}
                                            shape="rounded"
                                            variant="contained"
                                        />
                                    )}
                                </CoachNameContainer>
                            </Flex>
                        </CoachHeader>
                        <Separator color="light" />

                        {coach.coachSlots.length > 0 ? (
                            <>
                                <Flex
                                    $flexWrap="wrap"
                                    $gap="var(--space-16)"
                                    $width="100%"
                                >
                                    {coach.coachSlots.map((slot) => (
                                        <Button
                                            key={slot.id}
                                            variant="outlined"
                                            size="sm"
                                            shape="circle"
                                            color="secondary"
                                            disabled={
                                                slot.status ===
                                                    SlotStatus.UNAVILABLE ||
                                                slot.isPast === true
                                            }
                                            onClick={() =>
                                                onSlotClick(slot, coach)
                                            }
                                        >
                                            {formatTimeRange(
                                                slot.startTime,
                                                slot.endTime
                                            )}
                                        </Button>
                                    ))}
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
    );
};
