import styled from "@emotion/styled";

type FlexProps = {
    $flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    $alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    $justifyContent?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    $flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
    $gap?: string;
    $rowGap?: string;
    $columnGap?: string;
    $display?: "flex" | "inline-flex";

    $alignContent?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "stretch"
        | "space-between"
        | "space-around"
        | "space-evenly";

    $flex?: string;
    $flexGrow?: number;
    $flexShrink?: number;
    $flexBasis?: string;
    $alignSelf?:
        | "auto"
        | "flex-start"
        | "flex-end"
        | "center"
        | "stretch"
        | "baseline";
    $order?: number;

    // Sizing (works for both container and item)
    $width?: string;
    $height?: string;
    $minWidth?: string;
    $maxWidth?: string;
    $minHeight?: string;
    $maxHeight?: string;
};

export const Flex = styled.div<FlexProps>`
    display: ${(props) => props.$display || "flex"};

    flex-direction: ${(props) => props.$flexDirection || "row"};
    align-items: ${(props) => props.$alignItems || "stretch"};
    justify-content: ${(props) => props.$justifyContent || "flex-start"};
    flex-wrap: ${(props) => props.$flexWrap || "nowrap"};

    ${(props) => props.$gap && `gap: ${props.$gap};`}
    ${(props) => props.$rowGap && `row-gap: ${props.$rowGap};`}
    ${(props) => props.$columnGap && `column-gap: ${props.$columnGap};`}
    

    ${(props) =>
        props.$alignContent && `align-content: ${props.$alignContent};`}
    

    ${(props) => props.$flex && `flex: ${props.$flex};`}
    ${(props) =>
        props.$flexGrow !== undefined && `flex-grow: ${props.$flexGrow};`}
    ${(props) =>
        props.$flexShrink !== undefined && `flex-shrink: ${props.$flexShrink};`}
    ${(props) => props.$flexBasis && `flex-basis: ${props.$flexBasis};`}
    ${(props) => props.$alignSelf && `align-self: ${props.$alignSelf};`}
    ${(props) => props.$order !== undefined && `order: ${props.$order};`}
    

    ${(props) => props.$width && `width: ${props.$width};`}
    ${(props) => props.$height && `height: ${props.$height};`}
    ${(props) => props.$minWidth && `min-width: ${props.$minWidth};`}
    ${(props) => props.$maxWidth && `max-width: ${props.$maxWidth};`}
    ${(props) => props.$minHeight && `min-height: ${props.$minHeight};`}
    ${(props) => props.$maxHeight && `max-height: ${props.$maxHeight};`}
`;
