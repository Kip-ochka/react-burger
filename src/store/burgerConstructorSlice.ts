import { createSlice, nanoid } from '@reduxjs/toolkit'
import { BurgerConstructorSlice } from '../types/burgerConstructorTypes'

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
      const { item, subId } = action.payload
      const dragIndex = item.subId
      const hoverIndex = subId
      if (item.subId === subId) return
      state.inConstructor.splice(
        dragIndex,
        0,
        state.inConstructor.splice(hoverIndex, 1)[0]
      )
      item.subId = hoverIndex
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
