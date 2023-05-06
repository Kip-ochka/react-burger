import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {OrderSlice, OutcomingOrder} from '../types/orderTypes'
import {BASE_URL} from '../utils/variables'
import {getResponseData} from "../utils/helpers/checkResponse";

export const fetchPostOrder = createAsyncThunk(
    'order/postOrder',
    async (orderData: { ingredients: string[] }, {rejectWithValue}) => {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        return await getResponseData(response, rejectWithValue)
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
export const {cleanError, setError} = orderSlice.actions
export default orderSlice.reducer
