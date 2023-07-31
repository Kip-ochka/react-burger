import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { OrderListResponse} from '../../types/orderTypes'
import { AppDispatch, RootState } from '../index';
import {TWSActions} from "../../types/socket";
import {setOrders} from "../orderSlice";
import {fetchRefreshAccessToken} from "../userSlice";

export const createSocketMiddleware = (wsActions: TWSActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let isConnected: boolean = false;
        let reconnectTimer: number = 0;

        return (next) => (action) => {
            const { dispatch } = store;

            if (wsActions.websocketStartConnecting.match(action)) {
                socket = new WebSocket(action.payload!);
                isConnected = true;
                window.clearInterval(reconnectTimer);
                reconnectTimer = 0;

                socket.onopen = () => {
                    console.log('Socket connected');
                    dispatch(wsActions.websocketConnecting());
                }

                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event;
                    const parsedData: OrderListResponse = JSON.parse(data);
                    dispatch(setOrders(parsedData));
                    if (parsedData?.message === 'Token is invalid') {
                        dispatch(fetchRefreshAccessToken()).then(() => dispatch(wsActions.websocketStartConnecting(action.payload!)));
                    }
                }

                socket.onerror = () => {
                    console.log('Socket disconnected with error');
                    dispatch(wsActions.webSocketError('Socket disconnected with error'));
                }

                socket.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {
                        console.log(`Server closed with code ${event.code}.\n${event.reason}`);
                        dispatch(wsActions.webSocketError(event.reason));
                    }

                    if (isConnected) {
                        console.log('Reconnecting');
                        dispatch(wsActions.websocketConnecting());
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsActions.websocketStartConnecting(action.payload!));
                        }, 3000);
                    }
                }
            }

            if (socket && wsActions.websocketDisconnecting.match(action)) {
                window.clearTimeout(reconnectTimer);
                isConnected = false;
                socket.close();
            }

            return next(action);
        }
    }
}
