import {FC} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../utils/hooks/reduxTypedHooks";


interface ProtectedRouteProps {
    element: JSX.Element;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({element}) => {
    const {isLogged} = useAppSelector((state) => state.user);
    const location = useLocation();

    return isLogged ? (
        element
    ) : (
        <Navigate to="/login" replace state={{redirectTo: location}}/>
    );
};
