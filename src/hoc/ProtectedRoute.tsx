import {FC} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../utils/hooks/reduxTypedHooks";


interface ProtectedRouteProps {
    element: JSX.Element
    anonymous?: boolean
    background?: Location;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({element, anonymous = false, background}) => {
    const isLogged = useAppSelector((store) => store.user.isLogged);
    const location = useLocation();
    const from = location.state?.from || '/';

    if ((location.pathname === '/profile/orders' || location.pathname === '/feed' || background) && !isLogged) {
        return null
    }

    if (anonymous && isLogged) {
        return <Navigate to={from}/>;
    }

    if (!anonymous && !isLogged) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return element;
}
