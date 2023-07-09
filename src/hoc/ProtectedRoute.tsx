import {FC} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../utils/hooks/reduxTypedHooks";


interface ProtectedRouteProps {
    element: JSX.Element
    anonymous?:boolean
}

export const ProtectedRoute: FC<ProtectedRouteProps> =({ element, anonymous = false }) => {
    const isLogged = useAppSelector((store) => store.user.isLogged);

    const location = useLocation();
    const from = location.state?.from || '/';
    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isLogged) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={ from } />;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !isLogged) {
        // ...то отправляем его на страницу логин
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return element;
}
