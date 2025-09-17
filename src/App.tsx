import { Outlet } from "react-router-dom";
import { useGetMe } from "./pages/hooks/useGetMe";

export const App = () => {
    const { isLoading } = useGetMe();

    if (isLoading) {
        return null;
    }

    return <Outlet />;
};
