import styled from "@emotion/styled";
import { useState } from "react";
import { DatePicker, Flex, Typography } from "../../../../design-system";
import { PageBody } from "../../../components/Layout";
import { PageHeader } from "../../../components/PageHeader";
import { useCoachesSlots } from "../../../hooks/coaches-slots/useCoachesSlots";
import { CoachesAvailability } from "./CoachesAvailability";

const DatePickerWrapper = styled.div`
    margin-bottom: var(--space-32);
    width: 30rem;
`;

export const CoachesAvailabilityContainer = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const { coaches, isLoading, error } = useCoachesSlots(selectedDate);

    return (
        <>
            <PageHeader pageTitle="Coaches" />
            <PageBody>
                <DatePickerWrapper>
                    <DatePicker
                        inputSize="md"
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
                        <CoachesAvailability coaches={coaches} />
                    )}
                </Flex>
            </PageBody>
        </>
    );
};
