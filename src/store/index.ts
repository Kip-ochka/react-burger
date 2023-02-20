import { configureStore } from '@reduxjs/toolkit'
import burgerConstructorSlice from './burgerConstructorSlice'
import ingridientsSlice from './ingridientsSlice'
import orderSlice from './orderSlice'

const store = configureStore({
  reducer: {
    ingridients: ingridientsSlice,
    burgerConstructor: burgerConstructorSlice,
    order: orderSlice,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
