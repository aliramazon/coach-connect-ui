import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../../components/PageHeader";
import { AddAvailabilityModal } from "./AddAvailabilityModal";

export const Availability = () => {
    const [showAvailability, setShowAvailability] = useState(false);

    return (
        <>
            <PageHeader
                pageTitle="Availability"
                actionButtonText="Add Availability"
                actionButtonIcon={PlusIcon}
                actionButtonOnClick={() => setShowAvailability(true)}
            />
            {showAvailability && (
                <AddAvailabilityModal
                    show={showAvailability}
                    onClose={() => setShowAvailability(false)}
                />
            )}
        </>
    );
};
