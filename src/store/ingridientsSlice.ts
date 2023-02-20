import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IngridientsData, IngridientsSlice } from '../types/ingridientsTypes'
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

const ingredients = createSlice({
  name: 'ingridients',
  initialState: {
    loading: false,
    error: null,
    ingredients: [],
  } as IngridientsSlice,
  reducers: {},
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

export default ingredients.reducer
