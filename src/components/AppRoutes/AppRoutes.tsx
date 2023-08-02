import {FC, Suspense, useCallback, useMemo} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {routeConfig} from '../../utils/configs/routeConfig'
import {PageLayout} from '../PageLayout/PageLayout'
import Preloader from '../Preloader/Preloader'
import {useAppDispatch} from "../../utils/hooks/reduxTypedHooks";
import {setIngredientsToPage} from "../../store/ingridientsSlice";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../IngredientDetails/IngredientDetails";
import OrderDetailsInfo from "../OrderDetailsInfo/OrderDetailsInfo";
import {ProtectedRoute} from "../../hoc/ProtectedRoute";
import {DetailPage} from "../../pages/DetailPage";

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
        <Suspense
            fallback={
                <PageLayout>
                    <Preloader/>
                </PageLayout>
            }
        >
            <Routes location={background || location}>
                {Object.values(routeConfig).map(({element, path}) => {
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={<PageLayout>{element}</PageLayout>}
                        />
                    )
                })}
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
                        />}
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
                            <Modal onClose={handleCloseOrder} title={`#${orderNumber}` || ''}>
                                <OrderDetailsInfo withoutHeader/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </Suspense>
    )
}

export default AppRoutes
