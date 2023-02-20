import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import {
  IncomingOrder,
  IngridientsData,
  IngridientSlice,
  OutcomingOrder,
} from '../types/ingidientSlice'
import { BASE_URL } from '../utils/variables'

export const fetchGetIngridients = createAsyncThunk<
  IngridientsData,
  undefined,
  { rejectValue: string }
>('ingridients/getIngridients', async (_, { rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    return rejectWithValue(`${response.statusText}`)
  }
})

export const fetchPostOrder = createAsyncThunk(
  'ingridients/postOrder',
  async (orderData: OutcomingOrder, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return rejectWithValue(`${response.statusText}`)
    }
  }
)

const ingridients = createSlice({
  name: 'ingridients',
  initialState: {
    loading: false,
    orderLoading: false,
    error: null,
    orderError: null,
    ingridientList: [],
    inConstructor: [],
    ingridientData: {},
    order: {} as IncomingOrder,
  } as IngridientSlice,
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
    cleanError: (state) => {
      state.orderError = null
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetIngridients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGetIngridients.fulfilled, (state, action) => {
        state.loading = false
        state.ingridientList = action.payload.data
      })
      .addCase(fetchGetIngridients.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchPostOrder.pending, (state) => {
        state.orderLoading = true
      })
      .addCase(fetchPostOrder.fulfilled, (state, action) => {
        state.orderLoading = false
        state.order = action.payload
        state.inConstructor = []
        state.loading = false
      })
      .addCase(fetchPostOrder.rejected, (state, action) => {
        state.orderLoading = false
        if (state.inConstructor.length === 0) {
          state.orderError = `Заказ пустой, добавьте ингридиенты, что бы мы начали готовить.`
          return
        }
        state.orderError = `Заказ не был создан, по причине: ${action.payload}`
      })
  },
})
export const { addIngridient, removeIngridient, moveIngridient, cleanError } =
  ingridients.actions
export default ingridients.reducer
