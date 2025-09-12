import { Check, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../Button";
import { useCloseWhenClickOutside } from "../hooks";
import { Input } from "../Input";
import { Label } from "../Label";
import { trimWhiteSpaces } from "../utils";
import "./Select.css";
import type { Option, OptionValue, SelectProps } from "./types";

const sizeClassNames = {
    md: "select-medium",
    lg: "select-large",
};

const shapeClassNames = {
    rounded: "select-rounded",
    circle: "select-circle",
};

const Select: React.FC<SelectProps> = (props) => {
    const {
        options,
        value,
        onSelect,
        label,
        headerPlaceholder,
        size,
        shape,
        disabled,
        error,
        hintMessage,
        searchable,
        className,
    } = props;

    const selectRef = useRef<HTMLDivElement>(null);

    const { show: expanded, setShow: setExpanded } =
        useCloseWhenClickOutside(selectRef);
    const [searchText, setSearchText] = useState("");

    const filterOptions = () => {
        return options.filter((option) =>
            option.value.toString().includes(searchText)
        );
    };

    const onClickHeader = () => {
        setExpanded((prevValue) => !prevValue);
    };

    const sizeClassName = size ? sizeClassNames[size] : "";
    const shapeClassName = shape ? shapeClassNames[shape] : "";
    const finalClassName = trimWhiteSpaces(
        `select ${sizeClassName} ${shapeClassName} ${className || ""} ${
            searchable ? "select-searchable" : ""
        }`
    );

    const finalHeaderClassName = trimWhiteSpaces(
        `select__header ${value ? "select__header--has-selection" : ""}`
    );

    const onSelectItem = (option: Option) => {
        onSelect(option);
        setExpanded(false);
    };

    const getOptionLabel = (value: OptionValue) => {
        const option = options.find((option) => option.value === value);

        return option?.label;
    };

    const finalHeaderPlaceholder = value
        ? getOptionLabel(value)
        : headerPlaceholder || "Select";

    const filteredOptions = filterOptions();

    return (
        <div className={finalClassName} ref={selectRef}>
            {label && <Label className="select__label">{label}</Label>}
            <Button
                size={size}
                shape={shape}
                variant="outlined"
                color="secondary"
                onClick={onClickHeader}
                className={finalHeaderClassName}
                disabled={disabled}
                fullWidth
            >
                {finalHeaderPlaceholder}
                <ChevronDown
                    className={`select__icon ${
                        expanded ? "select__icon--expanded" : ""
                    }`}
                />
            </Button>
            {expanded && (
                <div className="select__body">
                    <ul className="select__items">
                        {searchable && (
                            <li className="select__search">
                                <Input
                                    shape={shape}
                                    value={searchText}
                                    onChange={(value) => setSearchText(value)}
                                    placeholder="Search"
                                />
                            </li>
                        )}

                        {filteredOptions.map((option) => {
                            return (
                                <li
                                    key={option.value}
                                    className={trimWhiteSpaces(
                                        `select__item ${
                                            value === option.value
                                                ? "select__item--selected"
                                                : ""
                                        }`
                                    )}
                                    onClick={() => onSelectItem(option)}
                                >
                                    {option.label}
                                    {value === option.value && (
                                        <Check
                                            className="select__selected-icon"
                                            size={20}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export { Select };
