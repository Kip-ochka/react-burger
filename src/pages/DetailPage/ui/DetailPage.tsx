import React, {FC, useEffect} from 'react';
import cls from './DetailPage.module.css'
import {classNames} from "../../../utils/helpers/classNames";
import {TEXT, TypografyTheme, WS_URL} from "../../../utils/variables";
import {websocketDisconnecting, websocketStartConnecting} from "../../../store/socketSlice";
import {clearOrders} from "../../../store/orderSlice";
import {useLocation} from "react-router-dom";
import {useAppDispatch} from "../../../utils/hooks/reduxTypedHooks";

interface DetailPageProps {
    children: JSX.Element
    title?: string
}

export const DetailPage: FC<DetailPageProps> = ({children, title}) => {
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log('connecting')
        if (pathname.includes('/orders')) {
            const token = localStorage.getItem('access')!.split(' ')[1]
            dispatch(websocketStartConnecting(`${WS_URL}orders?token=${token}`));
        } else {
            dispatch(websocketStartConnecting(`${WS_URL}orders/all`));
        }
        return () => {
            dispatch(clearOrders());
            dispatch(websocketDisconnecting());
        }
    }, [dispatch, pathname]);

    return (
        <section className={cls.container}>
            {title && <h1 className={classNames(TEXT, {}, [TypografyTheme.large])}>{title}</h1>}
            {children}
        </section>
    );
};

export default DetailPage;
