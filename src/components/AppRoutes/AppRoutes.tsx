import {FC, Suspense, useCallback, useMemo} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {routeConfig} from '../../utils/configs/routeConfig'
import {PageLayout} from '../PageLayout/PageLayout'
import Preloader from '../Preloader/Preloader'
import {useAppDispatch} from "../../utils/hooks/reduxTypedHooks";
import {setIngredientsToPage} from "../../store/ingridientsSlice";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../IngredientDetails/IngredientDetails";

const AppRoutes: FC = () => {
    const location = useLocation();
    const background = useMemo(()=>location.state && location.state.background, [location.state])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClose = useCallback(() => {
        dispatch(setIngredientsToPage(null))
        navigate(-1)
    }, [dispatch, navigate])

    return (
        <Suspense
            fallback={
                <PageLayout>
                    <Preloader/>
                </PageLayout>
            }
        >
            <Routes location={background || location}>
                {Object.values(routeConfig).map(({element, path}) => (
                    <Route
                        key={path}
                        path={path}
                        element={<PageLayout>{element}</PageLayout>}
                    />
                ))}
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal onClose={handleClose} title={"Детали ингредиента"}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </Suspense>
    )
}

export default AppRoutes
