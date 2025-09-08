import styled from "@emotion/styled";

type FlexProps = {
    $direction?: "row" | "column";
    $align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    $justify?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    $wrap?: "nowrap" | "wrap" | "wrap-reverse";
    $gap?: string;
    $inline?: boolean;
};

export const Flex = styled.div<FlexProps>`
    display: ${(props) => (props.$inline ? "inline-flex" : "flex")};
    flex-direction: ${(props) => props.$direction || "row"};
    align-items: ${(props) => props.$align || "stretch"};
    justify-content: ${(props) => props.$justify || "flex-start"};
    flex-wrap: ${(props) => props.$wrap || "nowrap"};
    gap: ${(props) => props.$gap || "0"};
`;
