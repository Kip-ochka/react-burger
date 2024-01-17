import React, {useMemo} from 'react';
import cls from './OrdersListInfo.module.css'
import {useAppSelector} from "../../utils/hooks/reduxTypedHooks";
import {classNames} from "../../utils/helpers/classNames";
import {TEXT, TypografyTheme} from "../../utils/variables";


const OrdersListInfo = () => {
    const orders = useAppSelector(state => state.order)
    const ordersFilteredCollections = useMemo(() => {
        const collections: { ready: number[], working: number[] } = {
            ready: [],
            working: [],
        }
        orders.orders.forEach(order => {
            if (order.status === 'done') {
                if (collections.ready.length < 10) {
                    collections.ready.push(order.number)
                }
                return
            }
            if (order.status === 'pending') {
                if (collections.working.length < 10) {
                    collections.working.push(order.number)
                }
                return
            }
        })
        return collections
    }, [orders.orders])

    return (
        <section className={cls.section}>
            <div className={cls.ordersNumbers}>
                <div>
                    <h3 className={classNames(TEXT, {}, [TypografyTheme.medium, 'mb-6'])}>Готовы:</h3>
                    <ul className={cls.ul}>
                        {ordersFilteredCollections.ready.map(number => {
                            return <li
                                key={number}
                                className={classNames(TEXT, {}, [TypografyTheme.digitsMedium, cls.li, cls.green])}
                            >
                                {number}
                            </li>
                        })}
                    </ul>
                </div>
                <div>
                    <h3 className={classNames(TEXT, {}, [TypografyTheme.medium, 'mb-6'])}>В работе:</h3>
                    <ul className={cls.ul}>
                        {ordersFilteredCollections.working.slice(0, 10).map(number => {
                            return <li
                                key={number}
                                className={classNames(TEXT, {}, [TypografyTheme.digitsMedium, cls.li])}
                            >
                                {number}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <h3 className={classNames(TEXT, {}, [TypografyTheme.medium])}>Выполнено за все время:</h3>
                <p className={classNames(TEXT, {}, [TypografyTheme.digitsLarge, cls.shadow])}>{orders.total}</p>
            </div>
            <div>
                <h3 className={classNames(TEXT, {}, [TypografyTheme.medium])}>Выполено за сегодня:</h3>
                <p className={classNames(TEXT, {}, [TypografyTheme.digitsLarge, cls.shadow])}>{orders.totalToday}</p>
            </div>
        </section>
    );
};

export default OrdersListInfo;
