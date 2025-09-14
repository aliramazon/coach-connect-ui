import { Calendar } from "lucide-react";
import { Button, Input } from "../../design-system";
import { AuthForm, AuthWrapper } from "../components/Auth";
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
    const {
        email,
        password,
        isFormSubmitting,
        handleOnChangeEmail,
        handleOnChangePassword,
        loginUser,
    } = useLogin();

    return (
        <AuthWrapper pageTitle="Sign In">
            <AuthForm onSubmit={loginUser}>
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email.value}
                    onChange={handleOnChangeEmail}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                    error={!!email.error}
                    hintMessage={email.error}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password.value}
                    onChange={handleOnChangePassword}
                    shape="rounded"
                    size="lg"
                    disabled={isFormSubmitting}
                    error={!!password.error}
                    hintMessage={password.error}
                />

                <Button
                    color="primary"
                    size="lg"
                    shape="rounded"
                    disabled={isFormSubmitting}
                    endIcon={Calendar}
                >
                    Sign In
                </Button>
            </AuthForm>
        </AuthWrapper>
    );
};
