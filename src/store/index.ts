import { configureStore } from '@reduxjs/toolkit'
import burgerConstructorSlice from './burgerConstructorSlice'
import ingridientsSlice from './ingridientsSlice'
import orderSlice, {setOrders} from './orderSlice'
import userSlice from './userSlice'
import socketSlice from "./socketSlice";
import {TWSActions} from "../types/socket";
import {
  websocketStartConnecting,
  websocketConnecting,
  websocketDisconnecting,
  webSocketError
} from './socketSlice';
import {createSocketMiddleware} from "./middlewares/socketMiddleware";

const wsActions: TWSActions = {
  websocketStartConnecting,
  websocketConnecting,
  websocketDisconnecting,
  webSocketError,
  webSocketMessage: setOrders
}

const socketMiddleware = createSocketMiddleware(wsActions);

const store = configureStore({
  reducer: {
    ingridients: ingridientsSlice,
    burgerConstructor: burgerConstructorSlice,
    order: orderSlice,
    user: userSlice,
    socket:socketSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
