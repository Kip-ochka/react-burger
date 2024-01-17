import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {IngridientsData, IngridientsSlice} from '../types/ingridientsTypes'
import {request} from "../utils/helpers/checkResponse";

export const fetchGetIngridients = createAsyncThunk<
    IngridientsData,
    void
>('ingridients/getIngridients', async () => {
       return await request(`/ingredients`)
})

const ingredients = createSlice({
    name: 'ingridients',
    initialState: {
        loading: false,
        error: null,
        ingredients: [],
        ingredientsToPage: null,
    } as IngridientsSlice,
    reducers: {
        setIngredientsToPage: (state, action) => {
            state.ingredientsToPage = action.payload
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
                state.ingredients = action.payload.data
            })
            .addCase(fetchGetIngridients.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const {setIngredientsToPage} = ingredients.actions
export default ingredients.reducer
