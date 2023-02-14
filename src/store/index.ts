import { configureStore } from '@reduxjs/toolkit'
import ingridientsSlice from './ingridientsSlice'

const store = configureStore({
  reducer: { ingridients: ingridientsSlice },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
