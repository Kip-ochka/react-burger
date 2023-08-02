import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {OrderListResponse} from "./orderTypes";

export type TWSActions = {
    websocketStartConnecting: ActionCreatorWithPayload<string, "socketSlice/websocketStartConnecting">;
    websocketConnecting: ActionCreatorWithoutPayload<'socketSlice/websocketConnecting'>;
    websocketDisconnecting: ActionCreatorWithoutPayload<'socketSlice/websocketDisconnecting'>;
    webSocketError: ActionCreatorWithPayload<any, 'socketSlice/webSocketError'>;
    webSocketMessage: ActionCreatorWithPayload<OrderListResponse, "order/setOrders">
}
