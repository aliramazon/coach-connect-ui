import styled from "@emotion/styled";
import { CenteredModal, DatePicker, Flex } from "../../../../design-system";

type AddAvailabilityModalProps = {
    show: boolean;
    onClose: () => void;
};

const TimeInputs = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: var(--space-16);
`;

export const AddAvailabilityModal: React.FC<AddAvailabilityModalProps> = ({
    show,
    onClose,
}) => {
    return (
        <CenteredModal
            show={show}
            showCloseIcon={true}
            onClose={onClose}
            title="Set Your Availability"
            subtitle="Select the dates and times you are open for coaching sessions."
            primaryActionButton={{
                text: "Save Availability",
                onClick: () => {},
            }}
        >
            <Flex $flexDirection="column" $rowGap="1.6rem">
                <DatePicker
                    inputSize="lg"
                    shape="rounded"
                    label="Select Date"
                    id="available-date"
                    placeholderText="What is your available day?"
                />

                <TimeInputs>
                    <DatePicker
                        inputSize="lg"
                        shape="rounded"
                        label="Start Time"
                        id="available-start-time"
                        placeholderText="Start Time"
                        showTimeSelect
                        showTimeSelectOnly
                    />

                    <DatePicker
                        inputSize="lg"
                        shape="rounded"
                        label="End Time"
                        id="available-end-time"
                        placeholderText="End Time"
                        showTimeSelect
                        showTimeSelectOnly
                    />
                </TimeInputs>
            </Flex>
        </CenteredModal>
    );
};
