import {FC, memo, useEffect} from 'react'
import {TEXT} from 'react-dnd-html5-backend/dist/NativeTypes'
import {Route, Routes, useLocation} from 'react-router-dom'
import {ProfileInputs} from '../../../components/ProfileInputs/ProfileInputs'
import {ProfileNav} from '../../../components/ProfileNav/ProfileNav'
import {classNames} from '../../../utils/helpers/classNames'
import {INACTIVE_COLOR, TypografyTheme, WS_URL} from '../../../utils/variables'
import cls from './ProfilePage.module.css'
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxTypedHooks";
import Preloader from "../../../components/Preloader/Preloader";
import OrderList from "../../../components/OrderList/OrderList";
import {websocketDisconnecting, websocketStartConnecting} from "../../../store/socketSlice";
import {clearOrders} from "../../../store/orderSlice";

const ProfilePage: FC = memo(() => {
    const {userLoading} = useAppSelector(state => state.user)
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(pathname.includes('/orders')){
            const token = localStorage.getItem('access')!.split(' ')[1]
            console.log('connecting')
            dispatch(websocketStartConnecting(`${WS_URL}orders?token=${token}`));
        }
        return () => {
            dispatch(clearOrders());
            dispatch(websocketDisconnecting());
        }
    }, [dispatch, pathname]);

    return (
        <section className={classNames(cls.page)}>
            {userLoading
                ? <Preloader/>
                : (<div className={classNames(cls.wrapper)}>
                    <div className={classNames(cls.nav)}>
                        <ProfileNav/>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <p
                                        className={classNames(TEXT, {}, [
                                            TypografyTheme.default,
                                            INACTIVE_COLOR,
                                        ])}
                                    >
                                        В этом разделе вы можете изменить свои персональные данные
                                    </p>
                                }
                            />
                            <Route
                                path="/orders"
                                element={
                                    <p
                                        className={classNames(TEXT, {}, [
                                            TypografyTheme.default,
                                            INACTIVE_COLOR,
                                        ])}
                                    >
                                        В этом разделе вы можете просмотреть свою историю заказов
                                    </p>
                                }
                            />
                        </Routes>
                    </div>
                    <Routes>
                        <Route path="/" element={<ProfileInputs/>}/>
                        <Route path="/orders" element={<OrderList/>}/>
                    </Routes>
                </div>)}

        </section>
    )
})

export default ProfilePage
