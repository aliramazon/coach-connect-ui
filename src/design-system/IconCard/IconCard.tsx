import { Icon, type IconSize } from "../Icon";
import { trimWhiteSpaces } from "../utils";
import { colorClassNames, shapeClassNames, sizeClassNames } from "./classnames";
import { type IconCardProps } from "./types";

import "./IconCard.css";

const IconCardIconSize = {
    sm: 24,
    md: 36,
    lg: 48,
};

const IconCard: React.FC<IconCardProps> = ({
    color,
    size,
    iconName,
    shape,
    className,
}) => {
    const sizeClassName = sizeClassNames[size];
    const colorClassName = colorClassNames[color];
    const shapeClassName = shapeClassNames[shape];

    const classNames = trimWhiteSpaces(
        `iconCard ${sizeClassName} ${colorClassName} ${shapeClassName} ${
            className ? className : ""
        }`
    );
    const iconSize = IconCardIconSize[size];

    return (
        <div className={classNames}>
            <Icon
                iconName={iconName}
                className="iconCard-icon"
                size={iconSize as IconSize}
            />
        </div>
    );
};

export { IconCard };
