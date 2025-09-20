import { PlusIcon } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
export const Students = () => {
    return (
        <PageHeader
            pageTitle="Students"
            actionButtonText="Add Student"
            actionButtonIcon={PlusIcon}
        />
    );
};
