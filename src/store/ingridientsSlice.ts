import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {IngridientsData, IngridientsSlice} from '../types/ingridientsTypes'
import {BASE_URL} from '../utils/variables'
import {getResponseData} from "../utils/helpers/checkResponse";

export const fetchGetIngridients = createAsyncThunk<
    IngridientsData,
    void,
    {rejectValue:string}
>('ingridients/getIngridients', async (_,{rejectWithValue}) => {
    const response = await fetch(`${BASE_URL}/ingredients`, {
        method: 'GET',
    })
    return await getResponseData(response, rejectWithValue)
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
                state.error = action.payload
            })
    },
})

export const {setIngredientsToPage} = ingredients.actions
export default ingredients.reducer
