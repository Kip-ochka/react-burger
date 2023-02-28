import { RouteProps } from 'react-router-dom'
import { ConstructorPage } from '../../pages/ConstructorPage'
import { ForgotPasswordPage } from '../../pages/ForgotPassword'
import { LoginPage } from '../../pages/LoginPage'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { ProfilePage } from '../../pages/ProfilePage'
import { RegisterPage } from '../../pages/RegisterPage'
import { ResetPasswordPage } from '../../pages/ResetPasswordPage'

export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password',
  PROFILE = 'profile',
  INGREDIENTS_ID = 'ingredients-id',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.FORGOT_PASSWORD]: '/forgot-password',
  [AppRoutes.RESET_PASSWORD]: '/reset-password',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.INGREDIENTS_ID]: '/ingredients/:id',
  //последний
  [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <ConstructorPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.REGISTER]: {
    path: RoutePath.register,
    element: <RegisterPage />,
  },
  [AppRoutes.FORGOT_PASSWORD]: {
    path: RoutePath['forgot-password'],
    element: <ForgotPasswordPage />,
  },
  [AppRoutes.RESET_PASSWORD]: {
    path: RoutePath['reset-password'],
    element: <ResetPasswordPage />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
  },
  [AppRoutes.INGREDIENTS_ID]: {
    path: RoutePath['ingredients-id'],
    element: <></>,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
}
