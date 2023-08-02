import {RouteProps} from 'react-router-dom'
import {ConstructorPage} from '../../pages/ConstructorPage'
import {ForgotPasswordPage} from '../../pages/ForgotPassword'
import {LoginPage} from '../../pages/LoginPage'
import {NotFoundPage} from '../../pages/NotFoundPage'
import {ProfilePage} from '../../pages/ProfilePage'
import {RegisterPage} from '../../pages/RegisterPage'
import {ResetPasswordPage} from '../../pages/ResetPasswordPage'
import {ProtectedRoute} from "../../hoc/ProtectedRoute";
import {DetailPage} from "../../pages/DetailPage";
import {IngredientDetails} from "../../components/IngredientDetails/IngredientDetails";
import {FeedPage} from "../../pages/FeedPage";
import OrderDetailsInfo from "../../components/OrderDetailsInfo/OrderDetailsInfo";

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REGISTER = 'register',
    FORGOT_PASSWORD = 'forgot-password',
    RESET_PASSWORD = 'reset-password',
    PROFILE = 'profile',
    PROFILE_ORDERS = 'profile-orders',
    INGREDIENTS_ID = 'ingredients-id',
    NOT_FOUND = 'not_found',
    FEED = 'feed',
    FEED_ID = 'feed-id',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.FORGOT_PASSWORD]: '/forgot-password',
    [AppRoutes.RESET_PASSWORD]: '/reset-password',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.PROFILE_ORDERS]: '/profile/orders',
    [AppRoutes.INGREDIENTS_ID]: '/ingredients/:id',
    [AppRoutes.FEED]: '/feed',
    [AppRoutes.FEED_ID]: '/feed/:id',
    //последний
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <ConstructorPage/>,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <ProtectedRoute anonymous element={<LoginPage/>}/>,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <ProtectedRoute anonymous element={<RegisterPage/>}/>,
    },
    [AppRoutes.FORGOT_PASSWORD]: {
        path: RoutePath['forgot-password'],
        element: <ProtectedRoute anonymous element={<ForgotPasswordPage/>}/>,
    },
    [AppRoutes.RESET_PASSWORD]: {
        path: RoutePath['reset-password'],
        element: <ProtectedRoute anonymous element={<ResetPasswordPage/>}/>,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProtectedRoute element={<ProfilePage/>}/>,
    },
    [AppRoutes.PROFILE_ORDERS]: {
        path: RoutePath['profile-orders'],
        element: <ProtectedRoute element={<ProfilePage/>}/>,
    },
    [AppRoutes.INGREDIENTS_ID]: {
        path: RoutePath['ingredients-id'],
        element: (
            <DetailPage title={'Детали ингридиента'}>
                <IngredientDetails/>
            </DetailPage>)
    },
    [AppRoutes.FEED]: {
        path: RoutePath['feed'],
        element: (<FeedPage/>),
    },
    [AppRoutes.FEED_ID]: {
        path: RoutePath['feed-id'],
        element: (
            <DetailPage>
                <OrderDetailsInfo/>
            </DetailPage>
        ),
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>,
    },
}
