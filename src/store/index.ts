import { configureStore } from '@reduxjs/toolkit'
import burgerConstructorSlice from './burgerConstructorSlice'
import ingridientsSlice from './ingridientsSlice'
import orderSlice from './orderSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    ingridients: ingridientsSlice,
    burgerConstructor: burgerConstructorSlice,
    order: orderSlice,
    user: userSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
