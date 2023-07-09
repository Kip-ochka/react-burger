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
            console.log(res)
            if ((res.payload=== 'Ошибка 401'||res.payload==='Ошибка 403')&&localStorage.getItem('refresh')) {
                dispatch(fetchRefreshAccessToken()).then(res => {
                    dispatch(getUser())
                    if (res.type === 'user/refreshToken/rejected') {
                        dispatch(setError(null))
                    }
                })
            } else {
                dispatch(setError(null))
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
