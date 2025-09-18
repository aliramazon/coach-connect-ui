import { Outlet } from "react-router-dom";
import { useGetMe } from "./app/hooks/useGetMe";

export const App = () => {
    const { isLoading } = useGetMe();

    if (isLoading) {
        return null;
    }

    return <Outlet />;
};
