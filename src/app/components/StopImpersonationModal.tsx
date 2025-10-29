import { CenteredModal } from "../../design-system";
import { useImpersonate } from "../hooks/auth/useImpersonate";
import { useUserStore } from "../store/useUserStore";

type Props = {
    show: boolean;
    onClose: () => void;
};

export const StopImpersonationModal = ({ show, onClose }: Props) => {
    const { isStoppingImpersonation, stopImpersonation } = useImpersonate({
        onSuccessStop: onClose,
    });
    const { impersonatedUser } = useUserStore();

    return (
        <CenteredModal
            show={show}
            showCloseIcon={true}
            onClose={onClose}
            title="Stop impersonation"
            subtitle={`You are stopping impersonating as ${impersonatedUser?.firstName} ${impersonatedUser?.lastName} that has role of ${impersonatedUser?.role}`}
            primaryActionButton={{
                text: "Confirm",
                onClick: stopImpersonation,
                disabled: isStoppingImpersonation,
                loading: isStoppingImpersonation,
            }}
        />
    );
};
