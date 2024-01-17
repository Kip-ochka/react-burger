import React, {FC, useMemo} from 'react';
import {IOrder} from "../../types/orderTypes";
import cls from './OrderItem.module.css'
import {classNames} from "../../utils/helpers/classNames";
import {INACTIVE_COLOR, TEXT, TypografyTheme} from "../../utils/variables";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../utils/hooks/reduxTypedHooks";
import {Ingridient} from "../../types/ingridient";
import {Link, useLocation} from "react-router-dom";

interface OrderItemInterface {
    order: IOrder,
    withStatus?: boolean,
}

const OrderItem: FC<OrderItemInterface> = ({order, withStatus}) => {
        const location = useLocation()
        const ingredients = useAppSelector(state => state.ingridients.ingredients)

        const orderItemData = useMemo(() => {
            const resultData: { orderIngredients: Ingridient[], totalPrice: number } = {
                orderIngredients: [],
                totalPrice: 0,
            }
            order.ingredients.forEach((id) => {
                const ingredient = ingredients.find(item => {
                    return item._id === id
                })
                if (ingredient) {
                    resultData.totalPrice = resultData.totalPrice + ingredient.price
                    resultData.orderIngredients.push(ingredient)
                }
            })
            return resultData
        }, [ingredients, order.ingredients])

        const checkLocation = useMemo(() => {
            if (location.pathname === "/profile/orders") {
                return `/profile/orders/${order._id}`;
            } else {
                return `/feed/${order._id}`;
            }
        }, [location.pathname, order._id])

        const orderStatus: string = order.status === 'done'
            ? 'Выполнен' : order.status === 'pending'
                ? 'Готовится' : order.status === 'created'
                    ? 'Создан' : ''

        const state = {background: location, orderNumber: order.number}

        return (
            <Link
                key={order._id}
                to={checkLocation}
                state={state}
                className={cls.link}
            >
                <li className={cls.li}>
                    <div className={cls.top}>
                        <p
                            className={classNames(TEXT, {}, [TypografyTheme.digitsDefault])}
                        >
                            #{order.number}
                        </p>
                        <p
                            className={classNames(TEXT, {}, [TypografyTheme.small, INACTIVE_COLOR])}
                        >
                            <FormattedDate date={new Date(order.createdAt)}/>
                        </p>
                    </div>
                    <p className={classNames(TEXT, {}, [TypografyTheme.medium])}>
                        {order.name}
                    </p>
                    {withStatus && <p className={classNames(TEXT, {}, [TypografyTheme.small])}>
                        {orderStatus}
                    </p>}
                    <ul className={cls.ul}>
                        {orderItemData.orderIngredients.slice(0, 6).map((item: Ingridient, i: number) => {
                            return (
                                <li
                                    key={item._id + item.name + i}
                                    className={cls.ingredient}
                                    style={{zIndex: orderItemData.orderIngredients.length - i}}>
                                    <img
                                        className={cls.ingredientImage}
                                        src={item.image_mobile}
                                        alt={item.name}
                                    />
                                    {orderItemData.orderIngredients.length > 6 && i === 5 && (
                                        <p className={cls.count}>+{orderItemData.orderIngredients.length - 6}</p>
                                    )}
                                </li>
                            )
                        })}
                        <div className={cls.priceWrapper}>
                            <p className={classNames(TEXT, {}, [TypografyTheme.digitsDefault])}>
                                {orderItemData.totalPrice}
                            </p>
                            <CurrencyIcon type='primary'/>
                        </div>
                    </ul>
                </li>
            </Link>

        );
    }
;

export default OrderItem;
