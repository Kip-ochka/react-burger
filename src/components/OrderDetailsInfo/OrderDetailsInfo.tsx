import React, {useMemo} from 'react';
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../utils/hooks/reduxTypedHooks";
import {Ingridient} from "../../types/ingridient";
import cls from './OrderDetailsInfo.module.css'
import {TEXT, TypografyTheme} from "../../utils/variables";
import {classNames} from "../../utils/helpers/classNames";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import Preloader from "../Preloader/Preloader";

const OrderDetailsInfo = ({withoutHeader = false}: { withoutHeader?: boolean }) => {
    const {id} = useParams();
    const orders = useAppSelector(state => state.order.orders)
    const ingredientList = useAppSelector(state => state.ingridients.ingredients)

    const orderState = useMemo(() => {
        const order = orders.find(order => order._id === id)
        if (!!order) {
            let totalPrice: number = 0
            const orderStatus: string = order.status === 'done'
                ? 'Выполнен' : order.status === 'pending'
                    ? 'Готовится' : order.status === 'created'
                        ? 'Создан' : ''

            const uniqIds: Record<string, number> = {}

            const ingredients: Array<Ingridient> = order.ingredients.reduce((acc, id) => {
                const ingredient = ingredientList.find(ingredientItem => ingredientItem._id === id)
                if (ingredient) {
                    totalPrice += ingredient.price
                    if (!uniqIds[ingredient._id]) {
                        uniqIds[ingredient._id] = 1
                        if (ingredient.type === 'bun') {
                            uniqIds[ingredient._id] += 1
                            totalPrice += ingredient.price
                        }
                        acc.push(ingredient)
                    } else {
                        uniqIds[ingredient._id] += 1
                    }
                }
                return acc
            }, [] as Array<Ingridient>)

            return {
                order,
                orderStatus,
                ingredients,
                totalPrice,
                uniqIds
            }
        }
    }, [id, ingredientList, orders])


    return (
        orderState
            ? (
                <div className={cls.wrapper}>
                    {!withoutHeader && (
                        <p className={classNames(TEXT, {}, [TypografyTheme.digitsDefault, cls.number])}>
                            {`#${orderState.order.number}`}
                        </p>
                    )}
                    <p className={classNames(TEXT, {}, [TypografyTheme.medium, cls.name])}>
                        {orderState.order.name}
                    </p>
                    <p className={classNames(TEXT, {}, [TypografyTheme.default, cls.status])}>
                        {orderState.orderStatus}
                    </p>
                    <p className={classNames(TEXT, {}, [TypografyTheme.medium, 'mb-6'])}>
                        Состав:
                    </p>
                    <div className={cls.ingredientsList}>
                        {orderState.ingredients.map((item, index) => {
                            return (
                                <div
                                    className={cls.ingredientsItem}
                                    key={item._id + item.name + index}
                                >
                                    <div className={cls.ingredientOverlay}>
                                        <img src={item.image_mobile} alt={item.name} className={cls.ingredientImage}/>
                                    </div>
                                    <p className={classNames(TEXT, {}, [TypografyTheme.medium, cls.ingredientName])}>
                                        {item.name}
                                    </p>
                                    <div className={cls.priceWrapper}>
                                        <p className={classNames(TEXT, {}, [TypografyTheme.digitsDefault])}>
                                            {`${orderState.uniqIds[item._id]} x ${item.price}`}
                                        </p>
                                        <CurrencyIcon type='primary'/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={cls.footer}>
                        <p className={classNames(TEXT, {}, [TypografyTheme.default, cls.time])}>
                            <FormattedDate date={new Date(orderState.order.createdAt)}/>
                        </p>
                        <div className={cls.priceWrapper}>
                            <p className={classNames(TEXT, {}, [TypografyTheme.digitsDefault])}>
                                {orderState.totalPrice}
                            </p>
                            <CurrencyIcon type='primary'/>
                        </div>
                    </div>

                </div>
            )
            : <Preloader/>

    );
};

export default OrderDetailsInfo;
