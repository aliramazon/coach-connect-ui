import React from "react";

import styled from "@emotion/styled";
import { ChevronRight } from "lucide-react";
import { Avatar, Typography } from "../../design-system";

const UserBase = styled.div`
    width: calc(100% - 1.6rem);
    margin: 0 auto;
    background-color: var(--jaguar-25);
    border-radius: var(--border-radius-16);
    padding: var(--space-12) var(--space-12) var(--space-12) var(--space-8);

    display: flex;
    align-items: center;
    gap: var(--space-12);
    cursor: pointer;

    svg {
        stroke: var(--jaguar-500);
    }
`;

const UserDetails = styled.div`
    margin-right: auto;
`;

type UserDetailsType = {
    firstName: string;
    lastName: string;
    email: string;
};

type UserProps = {
    details: UserDetailsType;
    onClick?: () => void;
};

const SideBarUser: React.FC<UserProps> = ({ details, onClick }) => {
    return (
        <UserBase onClick={onClick}>
            <Avatar
                firstName={details.firstName}
                lastName={details.lastName}
                size="lg"
                shape="rounded"
            />
            <UserDetails>
                <Typography variant="paragraph-sm" weight="medium">
                    {details.firstName} {details.lastName}
                </Typography>
                <Typography
                    variant="subtitle-sm"
                    weight="medium"
                    color="neutral"
                >
                    {details.email}
                </Typography>
            </UserDetails>
            <ChevronRight />
        </UserBase>
    );
};

export { SideBarUser };
