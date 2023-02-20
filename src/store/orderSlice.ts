import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { IncomingOrder, OrderSlice, OutcomingOrder } from '../types/orderTypes'
import { BASE_URL } from '../utils/variables'

export const fetchPostOrder = createAsyncThunk(
  'order/postOrder',
  async (orderData: { ingredients: string[] }, { rejectWithValue }) => {
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

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderLoading: false,
    orderError: null,
    order: {} as OutcomingOrder,
  } as OrderSlice,
  reducers: {
    cleanError: (state) => {
      state.orderError = null
    },
    setError: (state, action) => {
      state.orderError = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostOrder.pending, (state) => {
        state.orderError = null
        state.orderLoading = true
      })
      .addCase(fetchPostOrder.fulfilled, (state, action) => {
        state.orderLoading = false
        state.order = action.payload
      })
      .addCase(fetchPostOrder.rejected, (state, action) => {
        state.orderLoading = false
        state.orderError = `Заказ не был создан, по причине: ${action.payload}`
      })
  },
})
export const { cleanError, setError } = orderSlice.actions
export default orderSlice.reducer
