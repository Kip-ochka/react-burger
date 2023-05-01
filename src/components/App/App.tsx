import {FC, useEffect} from 'react'
import {classNames} from '../../utils/helpers/classNames'
import {AppHeader} from '../AppHeader/AppHeader'
import cls from './App.module.css'
import {
    useAppDispatch,
    useAppSelector,
} from '../../utils/hooks/reduxTypedHooks'
import {fetchGetIngridients} from '../../store/ingridientsSlice'
import Preloader from '../Preloader/Preloader'
import {PageLayout} from '../PageLayout/PageLayout'
import AppRoutes from '../AppRoutes/AppRoutes'
import {fetchRefreshAccessToken, getUser} from "../../store/userSlice";
import {setError} from "../../store/userSlice";

export const App: FC = () => {
    const dispatch = useAppDispatch()
    const {loading} = useAppSelector((state) => state.ingridients)
    useEffect(() => {
        dispatch(fetchGetIngridients())
        dispatch(getUser()).then((res) => {
            dispatch(setError(null))
            if (res.payload === 'jwt expired' && localStorage.getItem('refresh')) {
                dispatch(fetchRefreshAccessToken()).then(res => {
                    if (res.type === 'user/refreshToken/rejected') {
                        dispatch(setError(null))
                    }
                })
            }
        })
    }, [dispatch])

    return (
        <div className={classNames(cls.app)}>
            <AppHeader/>
            {loading ? (
                <PageLayout>
                    <Preloader/>
                </PageLayout>
            ) : (
                <AppRoutes/>
            )}
        </div>
    )
}
