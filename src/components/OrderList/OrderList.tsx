import React, {FC} from 'react';
import {classNames} from "../../utils/helpers/classNames";
import cls from "./OrderList.module.css"
import {useAppSelector} from "../../utils/hooks/reduxTypedHooks";
import {TEXT, TypografyTheme} from "../../utils/variables";
import OrderItem from "../OrderItem/OrderItem";
import {useLocation} from "react-router-dom";

const OrderList: FC = () => {
    const location = useLocation()
    const withStatus = location.pathname.includes('profile')
    const orders = useAppSelector(store => store.order.orders);
    return (
        <>
            {orders.length === 0
                ? (
                    <div className={cls.placeholderWrapper}>
                        <p
                            className={classNames(TEXT, {}, [TypografyTheme.large, cls.placeholder])}
                        >
                            Лента заказов пустая
                        </p>
                    </div>)
                : (
                    <ul className={classNames(cls.ul)}>
                        {orders.map(order => {
                            return <OrderItem order={order} withStatus={withStatus} key={order._id}/>
                        })}
                    </ul>
                )
            }
        </>
    );
};

export default OrderList;
