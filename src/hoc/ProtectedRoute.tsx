import {FC} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../utils/hooks/reduxTypedHooks";
import Preloader from "../components/Preloader/Preloader";


interface ProtectedRouteProps {
    element: JSX.Element
    anonymous?: boolean
    background?: Location;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({element, anonymous = false, background = null}) => {
    const isLogged = useAppSelector((store) => store.user.isLogged);
    const location = useLocation();
    const from = location.state?.from || '/';

    if (background && !isLogged) {
        return <Preloader/>
    }

    if (anonymous && isLogged) {
        return <Navigate to={from}/>;
    }

    if (!anonymous && !isLogged) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return element;
}
