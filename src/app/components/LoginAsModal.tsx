import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { CenteredModal, Select } from "../../design-system";
import { useGetUsers } from "../hooks/useGetUsers";
import { useImpersonate } from "../hooks/useImpersonate";
import { UserRole } from "../types/roles";

type LoginAsModalProps = {
    show: boolean;
    onClose: () => void;
};

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    margin-bottom: var(--space-24);
`;

export const LoginAsModal = ({ show, onClose }: LoginAsModalProps) => {
    const [role, setRole] = useState<UserRole>();
    const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
    const { users } = useGetUsers({ enabled: show });
    const { startImpersonation, isImpersonating } = useImpersonate({
        onSuccessImpersonation: onClose,
    });

    const filteredUsers = users.filter((user) => user.role === role);
    const usersDropdownOptions = filteredUsers.map((user) => {
        return { value: user.id, label: `${user.firstName} ${user.lastName}` };
    });

    const impersonate = async () => {
        if (!selectedUserId) return;
        await startImpersonation(selectedUserId);
    };

    useEffect(() => {
        setRole(undefined);
        setSelectedUserId(undefined);
    }, [show]);

    return (
        <CenteredModal
            show={show}
            showCloseIcon={true}
            onClose={onClose}
            title="Login As User"
            subtitle="Impersonate a user by selecting their role and account"
            primaryActionButton={{
                text: "Login",
                onClick: impersonate,
                disabled: isImpersonating,
            }}
        >
            <Inputs>
                <Select
                    size="lg"
                    shape="rounded"
                    value={role}
                    onSelect={(option) => setRole(option.value as UserRole)}
                    options={[
                        {
                            value: UserRole.STUDENT,
                            label: UserRole.STUDENT,
                        },
                        {
                            value: UserRole.COACH,
                            label: UserRole.COACH,
                        },
                    ]}
                    label="Role"
                    headerPlaceholder="Select Role"
                />
                <Select
                    size="lg"
                    shape="rounded"
                    value={selectedUserId}
                    onSelect={(option) =>
                        setSelectedUserId(option.value as string)
                    }
                    options={usersDropdownOptions}
                    label="User"
                    headerPlaceholder="Select User"
                    disabled={role ? false : true}
                />
            </Inputs>
        </CenteredModal>
    );
};
