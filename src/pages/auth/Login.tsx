import { useState } from "react";
import { useNavigate } from "react-router";

import styled from "@emotion/styled";
import { Button, Input } from "../../design-system";
import { AuthWrapper } from "../components/Auth";

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
`;

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleOnChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value: string) => {
        setPassword(value);
    };

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <AuthWrapper pageTitle="Sign In">
            <Form onSubmit={signIn}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleOnChangePassword}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                />

                <Button
                    color="primary"
                    size="lg"
                    shape="rounded"
                    disabled={isFormSubmitting}
                >
                    Sign In
                </Button>
            </Form>
        </AuthWrapper>
    );
};
