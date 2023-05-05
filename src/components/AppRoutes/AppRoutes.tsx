import {FC, Suspense, useCallback, useMemo} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {routeConfig} from '../../utils/configs/routeConfig'
import {PageLayout} from '../PageLayout/PageLayout'
import Preloader from '../Preloader/Preloader'
import {useAppDispatch, useAppSelector} from "../../utils/hooks/reduxTypedHooks";
import {setIngredientsToPage, toggleWindowOpen} from "../../store/ingridientsSlice";
import {Modal} from "../Modal/Modal";
import {ModalIngridient} from "../ModalIngridient/ModalIngridient";

const AppRoutes: FC = () => {
    const location = useLocation();
    const background = useMemo(()=>location.state && location.state.background, [location.state])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {isWindowOpen} = useAppSelector(state=>state.ingridients)

    const handleClose = useCallback(() => {
        dispatch(setIngredientsToPage(null))
        dispatch(toggleWindowOpen())
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
                            <Modal isOpen={isWindowOpen} onClose={handleClose} title={"Детали ингредиента"}>
                                <ModalIngridient />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </Suspense>
    )
}

export default AppRoutes
