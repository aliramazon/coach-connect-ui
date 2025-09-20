import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { LoaderCircle } from "lucide-react";
import { Flex } from "../../design-system";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Base = styled(Flex)`
    svg {
        stroke: var(--violet-300);
        animation: ${rotate} 1s linear infinite;
    }
`;

export const LoadingScreen = () => {
    return (
        <Base
            $justifyContent="center"
            $alignItems="center"
            $width="100%"
            $height="100vh"
        >
            <LoaderCircle size={72} />
        </Base>
    );
};
