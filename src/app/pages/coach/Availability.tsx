import { PlusIcon } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";

export const Availability = () => {
    return (
        <PageHeader
            pageTitle="Availability"
            actionButtonText="Add Availability"
            actionButtonIcon={PlusIcon}
        />
    );
};
