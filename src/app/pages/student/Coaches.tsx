import styled from "@emotion/styled";
import { useState } from "react";
import {
    Avatar,
    Badge,
    BaseCard,
    DatePicker,
    Flex,
    Typography,
} from "../../../design-system";
import { PageBody } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { useCoachesSlots } from "../../hooks/coaches-slots/useCoachesSlots";
import { formatTimeRange } from "../../utils/time-formatters";

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

const EmptyState = styled(Typography)`
    color: var(--gray-500);
`;

const DatePickerWrapper = styled.div`
    margin-bottom: var(--space-32);
    width: 30rem;
`;

export const Coaches = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { coaches, isLoading, error } = useCoachesSlots(selectedDate);

    const getCoachFullName = (firstName: string, lastName: string) => {
        return `${firstName} ${lastName}`;
    };

    return (
        <>
            <PageHeader pageTitle="Coaches" />
            <PageBody>
                <DatePickerWrapper>
                    <DatePicker
                        inputSize="lg"
                        shape="rounded"
                        label="Select Date"
                        id="coach-date-picker"
                        placeholderText="Select a date to view availability"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date as Date)}
                        dateFormat="MMMM d, yyyy"
                    />
                </DatePickerWrapper>

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
                                                            <Badge
                                                                key={slot.id}
                                                                label={formatTimeRange(
                                                                    slot.startTime,
                                                                    slot.endTime
                                                                )}
                                                                color="gray"
                                                                variant="outlined"
                                                                shape="rounded"
                                                            />
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
