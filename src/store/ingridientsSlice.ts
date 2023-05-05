import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {IngridientsData, IngridientsSlice} from '../types/ingridientsTypes'
import {BASE_URL} from '../utils/variables'

export const fetchGetIngridients = createAsyncThunk<
    IngridientsData,
    undefined,
    { rejectValue: string }
>('ingridients/getIngridients', async (_, {rejectWithValue}) => {
    const response = await fetch(`${BASE_URL}/ingredients`, {
        method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        return data
    } else {
        return rejectWithValue(`${response.statusText}`)
    }
})

const ingredients = createSlice({
    name: 'ingridients',
    initialState: {
        loading: false,
        error: null,
        ingredients: [],
        ingredientsToPage: null,
        isWindowOpen: false,
    } as IngridientsSlice,
    reducers: {
        setIngredientsToPage: (state, action) => {
            state.ingredientsToPage = action.payload
        },
        toggleWindowOpen: (state) => {
            state.isWindowOpen = !state.isWindowOpen
        }
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

export const {setIngredientsToPage, toggleWindowOpen} = ingredients.actions
export default ingredients.reducer
