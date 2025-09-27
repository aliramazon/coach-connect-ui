import { CenteredModal } from "../../design-system";
import { useImpersonate } from "../hooks/auth/useImpersonate";
import { useUserStore } from "../store/useUserStore";

type LoginAsModalProps = {
    show: boolean;
    onClose: () => void;
};

export const StopLoginAsModal = ({ show, onClose }: LoginAsModalProps) => {
    const { isStoppingImpersonation, stopImpersonation } = useImpersonate({
        onSuccessStop: onClose,
    });
    const { impersonatedUser } = useUserStore();

    return (
        <CenteredModal
            show={show}
            showCloseIcon={true}
            onClose={onClose}
            title="Stop Login As"
            subtitle={`You are stopping logging as ${impersonatedUser?.firstName} ${impersonatedUser?.lastName} that has role of ${impersonatedUser?.role}`}
            primaryActionButton={{
                text: "Confirm",
                onClick: stopImpersonation,
                disabled: isStoppingImpersonation,
            }}
        />
    );
};
