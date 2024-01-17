import React, {useEffect} from 'react';
import cls from './FeedPage.module.css'
import {classNames} from "../../../utils/helpers/classNames";
import {TEXT, TypografyTheme, WS_URL} from "../../../utils/variables";
import OrderList from "../../../components/OrderList/OrderList";
import OrdersListInfo from "../../../components/OrdersListInfo/OrdersListInfo";
import {websocketDisconnecting, websocketStartConnecting} from "../../../store/socketSlice";
import {clearOrders} from "../../../store/orderSlice";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/reduxTypedHooks";
import Preloader from "../../../components/Preloader/Preloader";

const FeedPage = () => {
    const dispatch = useAppDispatch();
    const {orders} = useAppSelector(state => state.order)
    useEffect(() => {
        console.log('connecting')
        dispatch(websocketStartConnecting(`${WS_URL}orders/all`));

        return () => {
            dispatch(clearOrders());
            dispatch(websocketDisconnecting());
        }
    }, [dispatch]);

    return (
        <section className={cls.feedSection}>
            {orders.length === 0 ? <Preloader/> : (
                <>
                    <h1 className={classNames(TEXT, {}, [TypografyTheme.large, 'mt-10', 'mb-5', cls.h1])}>
                        Лента заказов
                    </h1>
                    <div className={classNames(cls.feed)}>
                        <OrderList/>
                        <OrdersListInfo/>
                    </div>
                </>

            )}

        </section>
    );
};

export default React.memo(FeedPage);
