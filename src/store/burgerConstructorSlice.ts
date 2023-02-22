import { createSlice, nanoid } from '@reduxjs/toolkit'
import { BurgerConstructorSlice } from '../types/burgerConstructorTypes'
import { Ingridient } from '../types/ingridient'

const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState: {
    inConstructor: [],
  } as BurgerConstructorSlice,
  reducers: {
    addIngridient: (state, action) => {
      const { ingridient } = action.payload
      if (ingridient.type === 'bun') {
        state.inConstructor = [
          { ...ingridient, key: nanoid() },
          ...state.inConstructor.slice(1),
        ]
        return
      }
      state.inConstructor = [
        ...state.inConstructor,
        { ...ingridient, key: nanoid() },
      ]
    },
    removeIngridient: (state, action) => {
      state.inConstructor = state.inConstructor.filter((item, index) => {
        return index !== action.payload
      })
    },
    moveIngridient: (state, action) => {
      state.inConstructor = [
        state.inConstructor[0],
        ...action.payload.filter((item: Ingridient) => {
          return item.type !== 'bun'
        }),
      ]
    },
    clearConstructor: (state) => {
      state.inConstructor = []
    },
  },
})
export const {
  addIngridient,
  removeIngridient,
  moveIngridient,
  clearConstructor,
} = burgerConstructor.actions
export default burgerConstructor.reducer
