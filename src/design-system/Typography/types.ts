export type TypographyVariant =
    | "display-lg"
    | "display-sm"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "paragraph-lg"
    | "paragraph-md"
    | "paragraph-sm"
    | "subtitle-lg"
    | "subtitle-md"
    | "subtitle-sm";

export type TypographyWeight = "normal" | "medium" | "semibold" | "bold";

export type TypographyAlign =
    | "center"
    | "left"
    | "right"
    | "justify"
    | "inherit";

export type TypographyColor =
    | "primary"
    | "primary-strong"
    | "primary-extra-strong"
    | "warning"
    | "warning-strong"
    | "warning-extra-strong"
    | "neutral"
    | "neutral-strong"
    | "neutral-extra-strong"
    | "info"
    | "info-strong"
    | "info-extra-strong"
    | "success"
    | "success-strong"
    | "success-extra-strong"
    | "error"
    | "error-strong"
    | "error-extra-strong";

export type TypographyProps = {
    variant: TypographyVariant;
    weight?: TypographyWeight;
    align?: TypographyAlign;
    className?: string;
    children: React.ReactNode;
    color?: TypographyColor;
};
