import styled from "@emotion/styled";
import { CenteredModal, DatePicker, Flex } from "../../../../design-system";
import { useCreateSlot } from "../../../hooks/slot/useCreateSlot";

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
    const { form, onChangeField, onBlurField, createSlot, isSubmitting } =
        useCreateSlot();

    return (
        <CenteredModal
            show={show}
            showCloseIcon
            onClose={onClose}
            title="Set Your Availability"
            subtitle="Select the dates and times you are open for coaching sessions."
            primaryActionButton={{
                text: "Save Availability",
                onClick: createSlot,
                disabled: isSubmitting,
            }}
        >
            <Flex $flexDirection="column" $rowGap="1.6rem">
                <DatePicker
                    inputSize="lg"
                    shape="rounded"
                    label="Select Date"
                    id="available-date"
                    placeholderText="What is your available day?"
                    selected={form.date.value}
                    onChange={(date) => onChangeField(date, "date")}
                    onBlur={() => onBlurField("date")}
                    error={form.date.error.length > 0}
                    hintMessage={form.date.error}
                />

                <TimeInputs>
                    <DatePicker
                        inputSize="lg"
                        shape="rounded"
                        label="Start Time"
                        id="available-start-time"
                        placeholderText="Select Start Time"
                        showTimeSelect
                        showTimeSelectOnly
                        selected={form.startTime.value}
                        onChange={(time) => onChangeField(time, "startTime")}
                        onBlur={() => onBlurField("startTime")}
                        dateFormat="h:mm aa"
                        error={form.startTime.error.length > 0}
                        hintMessage={form.startTime.error}
                    />

                    <DatePicker
                        inputSize="lg"
                        shape="rounded"
                        label="End Time"
                        id="available-end-time"
                        placeholderText="Select End Time"
                        showTimeSelect
                        showTimeSelectOnly
                        selected={form.endTime.value}
                        onChange={(time) => onChangeField(time, "endTime")}
                        onBlur={() => onBlurField("endTime")}
                        dateFormat="h:mm aa"
                        error={form.endTime.error.length > 0}
                        hintMessage={form.endTime.error}
                    />
                </TimeInputs>
            </Flex>
        </CenteredModal>
    );
};
