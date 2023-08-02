import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {OrderListResponse, OrderSlice, OutcomingOrder} from '../types/orderTypes'
import {request} from "../utils/helpers/checkResponse";

export const fetchPostOrder = createAsyncThunk(
    'order/postOrder',
    async (orderData: { ingredients: string[] }, {rejectWithValue}) => {
        return await request('/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', Authorization: localStorage.getItem('access')!,
            },
            body: JSON.stringify(orderData),
        })
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderLoading: false,
        orderError: null,
        order: {} as OutcomingOrder,
        orders: [],
        total: null,
        totalToday: null,
    } as OrderSlice,
    reducers: {
        cleanError: (state) => {
            state.orderError = null
        },
        setError: (state, action) => {
            state.orderError = action.payload
        },
        clearOrders: (state) => {
            state.orders = [];
            state.total = null;
            state.totalToday = null;
        },
        setOrders: (state, action: PayloadAction<OrderListResponse>) => {
            state.orders = action.payload.orders.reverse();
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
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
                state.orderError = `Заказ не был создан, по причине: ${action.error.message}`
            })
    },
})
export const {cleanError, setError, clearOrders, setOrders} = orderSlice.actions
export default orderSlice.reducer
