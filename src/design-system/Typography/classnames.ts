import { type TypographyColor } from "./types";

export const variantClassNames = {
    "display-lg": "display-lg",
    "display-sm": "display-sm",
    h1: "heading-1",
    h2: "heading-2",
    h3: "heading-3",
    h4: "heading-4",
    h5: "heading-5",
    h6: "heading-6",

    "paragraph-lg": "paragraph-lg",
    "paragraph-md": "paragraph-md",
    "paragraph-sm": "paragraph-sm",

    "subtitle-lg": "subtitle-lg",
    "subtitle-md": "subtitle-md",
    "subtitle-sm": "subtitle-sm",
};

export const weightClassNames = {
    normal: "font-weight-normal",
    medium: "font-weight-medium",
    semibold: "font-weight-semibold",
    bold: "font-weight-bold",
};

export const alignClassNames = {
    center: "text-align-center",
    left: "text-align-left",
    right: "text-align-right",
    justify: "text-align-justify",
    inherit: "text-align-inherit",
};

export const colorClassNames: Record<TypographyColor, string> = {
    primary: "typography-primary",
    "primary-strong": "typography-primaryStrong",
    "primary-extra-strong": "typography-primaryExtraStrong",
    warning: "typography-warning",
    "warning-strong": "typography-warningStrong",
    "warning-extra-strong": "typography-warningExtraStrong",
    neutral: "typography-neutral",
    "neutral-strong": "typography-neutralStrong",
    "neutral-extra-strong": "typography-neutralExtraStrong",
    info: "typography-info",
    "info-strong": "typography-infoStrong",
    "info-extra-strong": "typography-infoExtraStrong",
    success: "typography-success",
    "success-strong": "typography-successStrong",
    "success-extra-strong": "typography-successExtraStrong",
    error: "typography-error",
    "error-strong": "typography-errorStrong",
    "error-extra-strong": "typography-errorExtraStrong",
};
