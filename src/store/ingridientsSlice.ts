import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IngridientsData, IngridientSlice } from '../types/ingidientSlice'
import { Ingridient } from '../types/ingridient'
import { BASE_URL } from '../utils/variables'

export const fetchGetIngridients = createAsyncThunk<
  IngridientsData,
  undefined,
  { rejectValue: string }
>('ingridients/getIngridients', async (_, { rejectWithValue }) => {
  const response = await fetch(BASE_URL, {
    method: 'GET',
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    return rejectWithValue(`${response.statusText}`)
  }
})

const ingridients = createSlice({
  name: 'ingridients',
  initialState: {
    loading: false,
    error: null,
    ingridientList: [],
    inConstructor: [],
    ingridientData: {},
    order: { ingridients: [] },
  } as IngridientSlice,
  reducers: {
    addIngridient: (state, action) => {
      console.log(action.payload)
      const { ingridient } = action.payload
      if (ingridient.type === 'bun') {
        state.inConstructor = [ingridient, ...state.inConstructor.slice(1)]
        return
      }
      state.inConstructor = [...state.inConstructor, ingridient]
    },
    removeIngridient: (state, action) => {
      state.inConstructor = state.inConstructor.filter((item, index) => {
        return index !== action.payload
      })
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
  },
})
export const { addIngridient, removeIngridient } = ingridients.actions
export default ingridients.reducer
