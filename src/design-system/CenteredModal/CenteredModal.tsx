import { X } from "lucide-react";
import type React from "react";
import { BaseModal } from "../BaseModal";
import { Button, type ButtonColor } from "../Button";
import { IconButton } from "../IconButon";
import { Typography } from "../Typography";
import "./CenteredModal.css";

interface CenteredModalActionButton {
    text: string;
    onClick: () => void;
    color?: ButtonColor;
    disabled?: boolean;
}

export interface CenteredModalProps {
    show: boolean;
    primaryActionButton: CenteredModalActionButton;
    secondaryActionButton?: CenteredModalActionButton;
    onClose?: () => void;
    title?: string;
    subtitle?: string;
    showCloseIcon: boolean;
    children?: React.ReactNode;
}

const CenteredModal = ({
    show,
    primaryActionButton,
    secondaryActionButton,
    onClose,
    title,
    subtitle,
    showCloseIcon,
    children,
}: CenteredModalProps) => {
    return (
        <BaseModal position="center" show={show}>
            <div className="modal__header">
                {title && (
                    <Typography
                        variant="paragraph-lg"
                        weight="medium"
                        className="modal__title"
                    >
                        {title}
                    </Typography>
                )}
                {subtitle && (
                    <Typography
                        variant="paragraph-sm"
                        className="modal__subtitle"
                    >
                        {subtitle}
                    </Typography>
                )}
                {showCloseIcon && (
                    <IconButton
                        size="sm"
                        color="secondary"
                        icon={X}
                        onClick={onClose}
                        shape="rounded"
                        className="modal__closeIcon"
                        variant="outlined"
                    />
                )}
            </div>
            {children && <div className="modal__body">{children}</div>}

            <div className="modal__actions">
                {secondaryActionButton && (
                    <Button
                        variant="outlined"
                        color={secondaryActionButton.color || "secondary"}
                        size="lg"
                        shape="rounded"
                        onClick={secondaryActionButton.onClick}
                    >
                        {secondaryActionButton.text}
                    </Button>
                )}

                <Button
                    variant="contained"
                    color={primaryActionButton.color || "primary"}
                    size="lg"
                    shape="rounded"
                    onClick={primaryActionButton.onClick}
                    disabled={primaryActionButton.disabled}
                >
                    {primaryActionButton.text}
                </Button>
            </div>
        </BaseModal>
    );
};

export { CenteredModal };
