import {FC, Suspense, useCallback, useMemo} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {PageLayout} from '../PageLayout/PageLayout'
import Preloader from '../Preloader/Preloader'
import {useAppDispatch} from "../../utils/hooks/reduxTypedHooks";
import {setIngredientsToPage} from "../../store/ingridientsSlice";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../IngredientDetails/IngredientDetails";
import OrderDetailsInfo from "../OrderDetailsInfo/OrderDetailsInfo";
import {ProtectedRoute} from "../../hoc/ProtectedRoute";
import {DetailPage} from "../../pages/DetailPage";
import {ConstructorPage} from "../../pages/ConstructorPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {FeedPage} from "../../pages/FeedPage";
import {LoginPage} from "../../pages/LoginPage";
import {RegisterPage} from "../../pages/RegisterPage";
import {ForgotPasswordPage} from "../../pages/ForgotPassword";
import {ResetPasswordPage} from "../../pages/ResetPasswordPage";
import {NotFoundPage} from "../../pages/NotFoundPage";

const AppRoutes: FC = () => {
    const location = useLocation();
    const background = useMemo(() => location.state && location.state.background, [location.state])
    const orderNumber = useMemo(() => location.state && location.state.orderNumber, [location.state])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleClose = useCallback(() => {
        dispatch(setIngredientsToPage(null))
        navigate(-1)
    }, [dispatch, navigate])

    const handleCloseOrder = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (
        (
            <Suspense
                fallback={
                    <PageLayout>
                        <Preloader/>
                    </PageLayout>
                }
            >
                <Routes location={background || location}>
                    <Route
                        path='/'
                        element={
                            <ConstructorPage/>
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                            <ProtectedRoute
                                element={<ProfilePage/>}
                            />
                        }
                    />
                    <Route
                        path='/profile/orders'
                        element={
                            <ProtectedRoute
                                element={
                                    <ProfilePage/>
                                }
                            />}
                    />
                    <Route
                        path={'/profile/orders/:id'}
                        element={
                            <ProtectedRoute
                                background={background}
                                element={
                                    <PageLayout>
                                        <DetailPage>
                                            <OrderDetailsInfo/>
                                        </DetailPage>
                                    </PageLayout>
                                }
                            />
                        }
                    />
                    <Route
                        path='/feed'
                        element={<FeedPage/>}
                    />
                    <Route
                        path='/feed/:id'
                        element={
                            <PageLayout>
                                <DetailPage>
                                    <OrderDetailsInfo/>
                                </DetailPage>
                            </PageLayout>
                        }
                    />
                    <Route
                        path='/ingredients/:id'
                        element={
                            <DetailPage
                                title={'Детали ингридиента'}
                            >
                                <IngredientDetails/>
                            </DetailPage>}/>
                    <Route
                        path='/login'
                        element={
                            <ProtectedRoute
                                anonymous
                                element={<LoginPage/>}
                            />
                        }
                    />
                    <Route
                        path='/register'
                        element={
                            <ProtectedRoute
                                anonymous
                                element={<RegisterPage/>}
                            />
                        }
                    />
                    <Route
                        path='/forgot-password'
                        element={
                            <
                                ProtectedRoute
                                anonymous
                                element={
                                    <ForgotPasswordPage/>
                                }
                            />
                        }
                    />
                    <Route
                        path='/reset-password'
                        element={
                            <ProtectedRoute
                                anonymous
                                element={
                                    <ResetPasswordPage/>
                                }
                            />
                        }
                    />
                    <Route
                        path='*'
                        element={
                            <NotFoundPage/>
                        }
                    />
                </Routes>
                {background && (
                    <Routes>
                        <Route
                            path="/ingredients/:id"
                            element={
                                <Modal onClose={handleClose} title={"Детали ингредиента"}>
                                    <IngredientDetails/>
                                </Modal>
                            }
                        />
                        <Route
                            path="/feed/:id"
                            element={
                                <Modal onClose={handleCloseOrder} title={`#${orderNumber}` || ''}>
                                    <OrderDetailsInfo withoutHeader/>
                                </Modal>
                            }
                        />
                        <Route
                            path="/profile/orders/:id"
                            element={
                                <Modal
                                    onClose={handleCloseOrder}
                                    title={`#${orderNumber}` || ''}
                                >
                                    <OrderDetailsInfo withoutHeader/>
                                </Modal>
                            }
                        />
                    </Routes>
                )}

            </Suspense>
        )
    )
}

export default AppRoutes
