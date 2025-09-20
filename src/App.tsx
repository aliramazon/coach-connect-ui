import { Outlet } from "react-router-dom";
import { LoadingScreen } from "./app/components/LoadingScreen";
import { useGetMe } from "./app/hooks/useGetMe";

export const App = () => {
    const { isLoading } = useGetMe();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return <Outlet />;
};
