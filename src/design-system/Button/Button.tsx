import { type FC, forwardRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Icon, type IconName } from "../Icon";
import { trimWhiteSpaces } from "../utils";
import "./Button.css";
import {
    colorClassNames,
    shapeClassNames,
    sizeClassNames,
    variantClassNames,
} from "./classnames";
import { type ButtonProps } from "./types";

const Button: FC<ButtonProps> = forwardRef(
    (props, ref: React.ForwardedRef<HTMLButtonElement>) => {
        const {
            size,
            shape,
            fullWidth,
            color,
            variant,
            disabled,
            className,
            children,
            onClick,
            renderAs,
            navigateTo,
            endIcon,
            startIcon,
        } = props;

        const sizeClassName = size !== undefined ? sizeClassNames[size] : "";

        const shapeClassName =
            shape !== undefined ? shapeClassNames[shape] : "";

        const colorClassName =
            color !== undefined ? colorClassNames[color] : "";

        const variantClassName =
            variant !== undefined ? variantClassNames[variant] : "";
        const fullWidthClassName = fullWidth ? "btn-full-width" : "";

        const finalClassNames = trimWhiteSpaces(
            `btn ${colorClassName} ${sizeClassName} ${shapeClassName} ${fullWidthClassName} ${variantClassName} ${
                className || ""
            }`
        );

        const renderFinalElement = () => {
            if (renderAs === "link" && navigateTo) {
                return (
                    <Link className={finalClassNames} to={navigateTo}>
                        {children}
                    </Link>
                );
            } else if (renderAs === "navLink") {
                return <NavLink to={navigateTo}>{children}</NavLink>;
            }

            return (
                <button
                    className={finalClassNames}
                    disabled={disabled}
                    onClick={onClick}
                    ref={ref}
                >
                    {startIcon && typeof startIcon === "string" ? (
                        <Icon iconName={startIcon as IconName} />
                    ) : (
                        startIcon
                    )}
                    {children}
                    {endIcon && typeof endIcon === "string" ? (
                        <Icon iconName={endIcon as IconName} />
                    ) : (
                        endIcon
                    )}
                </button>
            );
        };

        return renderFinalElement();
    }
);

export { Button };
