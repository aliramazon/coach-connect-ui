import React from "react";
import { positionClassNames } from "./classnames";
import "./Modal.css";
import { trimWhiteSpaces } from "../utils";

interface ModalProps {
    show: boolean;
    position: "center" | "right";
    children: React.ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({
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

export { Modal };
