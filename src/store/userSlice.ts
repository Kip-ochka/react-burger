import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  RegisteredPayload,
  RegisteredResponse,
  UserState,
} from '../types/userTypes'

export const fetchRegister = createAsyncThunk<
  RegisteredResponse,
  RegisteredPayload,
  { rejectValue: string }
>('user/register', async (payload, { rejectWithValue }) => {
  const response = await fetch(
    'https://norma.nomoreparties.space/api/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  )
  const data = await response.json()
  if (data.success) {
    return data
  } else {
    return rejectWithValue(data.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userLoading: false,
    isLogged: false,
    user: { name: '', email: '' },
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.error = null
      state.userLoading = true
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.error = null
      if (action.payload.user) {
        state.user = action.payload.user
      }
      state.isLogged = true
    })
    builder.addCase(fetchRegister.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload
      }
      console.log(state.error)
      state.userLoading = false
    })
  },
})

export const {} = userSlice.actions
export default userSlice.reducer
