import React from "react";
import { trimWhiteSpaces } from "../utils";
import "./BaseModal.css";
import { positionClassNames } from "./classnames";

interface BaseModalProps {
    show: boolean;
    position: "center" | "right";
    children: React.ReactNode;
    className?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
    show,
    position,
    className,
    children,
}) => {
    const positionClassName = positionClassNames[position];
    const finalOverlayClassNames = trimWhiteSpaces(
        `modal-overlay ${positionClassName} ${className || ""}`
    );

    return (
        <>
            {show ? (
                <div className={finalOverlayClassNames}>
                    <div className="modal">{children}</div>
                </div>
            ) : null}
        </>
    );
};

export { BaseModal };
