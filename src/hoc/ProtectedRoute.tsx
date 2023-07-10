import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../utils/hooks/reduxTypedHooks";


interface ProtectedRouteProps {
    element: JSX.Element
    anonymous?: boolean
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, anonymous = false }) => {
    const isLogged = useAppSelector((store) => store.user.isLogged);

    const location = useLocation();
    const from = location.state?.from || '/';
    if (anonymous && isLogged) {
        return <Navigate to={from} />;
    }

    if (!anonymous && !isLogged) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return element;
}
