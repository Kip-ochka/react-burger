import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {IngridientsData, IngridientsSlice} from '../types/ingridientsTypes'
import {request} from "../utils/helpers/checkResponse";

export const fetchGetIngridients = createAsyncThunk<
    IngridientsData,
    void,
    {rejectValue:string}
>('ingridients/getIngridients', async (_,{rejectWithValue}) => {
    try{
       return await request(`/ingredients`)
    }catch (e) {
       return rejectWithValue(e as string)
    }
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
                console.log(action)
                state.error = action.payload
            })
    },
})

export const {setIngredientsToPage} = ingredients.actions
export default ingredients.reducer
