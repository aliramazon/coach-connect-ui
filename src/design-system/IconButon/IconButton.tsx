import { type FC, forwardRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import { trimWhiteSpaces } from "../utils";
import {
    colorClassNames,
    shapeClassNames,
    sizeClassNames,
    variantClassNames,
} from "./classnames";
import "./IconButton.css";
import { type IconButtonProps } from "./types";

const IconButton: FC<IconButtonProps> = forwardRef(
    (props, ref: React.ForwardedRef<HTMLButtonElement>) => {
        const {
            iconName,
            size,
            shape,
            color,
            variant,
            disabled,
            className,
            onClick,
            renderAsLink,
            navigateTo,
        } = props;

        const sizeClassName = size !== undefined ? sizeClassNames[size] : "";

        const shapeClassName =
            shape !== undefined ? shapeClassNames[shape] : "";

        const colorClassName =
            color !== undefined ? colorClassNames[color] : "";

        const variantClassName =
            variant !== undefined ? variantClassNames[variant] : "";

        const finalClassNames = trimWhiteSpaces(
            `iconBtn ${colorClassName} ${sizeClassName} ${shapeClassName} ${variantClassName} ${
                className || ""
            }`
        );

        const renderFinalElement = () => {
            if (renderAsLink && navigateTo) {
                return (
                    <Link className={finalClassNames} to={navigateTo}>
                        <Icon iconName={iconName} />
                    </Link>
                );
            }
            return (
                <button
                    className={finalClassNames}
                    disabled={disabled}
                    onClick={onClick}
                    ref={ref}
                >
                    <Icon iconName={iconName} />
                </button>
            );
        };

        return renderFinalElement();
    }
);

export { IconButton };
