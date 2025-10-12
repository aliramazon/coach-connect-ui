import { useState } from "react";
import toast from "react-hot-toast";
import { slotService } from "../../services/slot";
import { useSlotStore } from "../../store/useSlotStore";
import { combineDateAndTime } from "../../utils/combine-date-and-time";
import {
    hasFieldValue,
    validateStartAndEndDatesOrder,
    type CreateSlotForm,
} from "../../utils/validators";

const validateSlotForm = (form: CreateSlotForm) => {
    const errors: Record<keyof CreateSlotForm, string> = {
        date: hasFieldValue(form.date),
        startTime: hasFieldValue(form.startTime),
        endTime: hasFieldValue(form.endTime),
    };

    if (
        !errors.startTime &&
        !errors.endTime &&
        form.startTime.value &&
        form.endTime.value
    ) {
        const orderErrors = validateStartAndEndDatesOrder(
            form.startTime.value,
            form.endTime.value
        );
        errors.startTime = orderErrors.startTime || "";
        errors.endTime = orderErrors.endTime || "";
    }

    return errors;
};

export const useCreateSlot = () => {
    const { addSlot } = useSlotStore();
    const [form, setForm] = useState<CreateSlotForm>({
        date: { value: null, error: "" },
        startTime: { value: null, error: "" },
        endTime: { value: null, error: "" },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onChangeField = (value: Date | null, field: keyof CreateSlotForm) => {
        setForm((prev: CreateSlotForm) => ({
            ...prev,
            [field]: { ...prev[field], value, error: "" },
        }));
    };

    const onBlurField = (field: keyof CreateSlotForm) => {
        const fieldErrorMessage = hasFieldValue(form[field]);
        console.log("hellooo");

        if (form.startTime.value && form.endTime.value) {
            const orderErrors = validateStartAndEndDatesOrder(
                form.startTime.value,
                form.endTime.value
            );

            setForm((prev: CreateSlotForm) => ({
                ...prev,
                startTime: {
                    ...prev.startTime,
                    error: orderErrors.startTime,
                },
                endTime: {
                    ...prev.endTime,
                    error: orderErrors.endTime,
                },
            }));
            return;
        }

        setForm((prev: CreateSlotForm) => ({
            ...prev,
            [field]: {
                ...prev[field],
                error: fieldErrorMessage,
            },
        }));
    };

    const createSlot = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        const errors = validateSlotForm(form);
        const hasErrors = Object.values(errors).some((err) => err);

        if (hasErrors) {
            setForm((prev) => ({
                date: { ...prev.date, error: errors.date },
                startTime: { ...prev.startTime, error: errors.startTime },
                endTime: { ...prev.endTime, error: errors.endTime },
            }));
            return;
        }

        if (!form.date.value || !form.startTime.value || !form.endTime.value)
            return;

        setIsSubmitting(true);
        setError(null);

        const start = combineDateAndTime(form.date.value, form.startTime.value);
        const end = combineDateAndTime(form.date.value, form.endTime.value);

        slotService
            .create(start.toISOString(), end.toISOString())
            .then((response) => {
                addSlot(response.data.slot);
                setForm({
                    date: { value: null, error: "" },
                    startTime: { value: null, error: "" },
                    endTime: { value: null, error: "" },
                });
                toast.success("Slot created successfully. Create a new one");
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
                toast.error(err.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return {
        form,
        isSubmitting,
        error,
        onChangeField,
        onBlurField,
        createSlot,
    };
};
