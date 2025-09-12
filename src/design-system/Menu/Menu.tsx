import { Ellipsis } from "lucide-react";
import { useRef } from "react";
import { useCloseWhenClickOutside } from "../hooks";
import { trimWhiteSpaces } from "../utils";
import "./Menu.css";
import { type MenuProps } from "./types";

const colorClassNames = {
    primary: "menu__option--violet",
    danger: "menu__option--danger",
};

const Menu: React.FC<MenuProps> = ({
    options,
    onSelect,
    customTrigger,
    className,
}) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { show, setShow } = useCloseWhenClickOutside(menuRef);

    const handleOnSelect = (value: string) => {
        setShow(false);
        onSelect(value);
    };

    const handleTriggerClick = () => {
        setShow((prevState) => !prevState);
    };

    const finalClassNames = trimWhiteSpaces(
        `menu ${className ? className : ""}`
    );

    return (
        <div className={finalClassNames} ref={menuRef}>
            <Ellipsis
                onClick={handleTriggerClick}
                className="menu__default-trigger"
            />
            {show ? (
                <ul className="menu__options">
                    {options.map((option) => {
                        const Icon = option.icon;
                        return (
                            <li
                                key={option.label}
                                className={trimWhiteSpaces(
                                    `menu__option ${
                                        option.color
                                            ? colorClassNames[option.color]
                                            : ""
                                    }`
                                )}
                                onClick={() => handleOnSelect(option.value)}
                            >
                                {Icon ? <Icon /> : null}
                                {option.label}
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
};

export { Menu };
