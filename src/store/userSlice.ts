import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
    ForgotPasswordPayload,
    ForgotPasswordResponse, GetUserResponse, LoginPayload, LoginResponse, LogoutResponse, RefreshAccessTokenResponse,
    RegisteredPayload,
    RegisteredResponse, ResetPasswordPayload, ResetPasswordResponse, SetUserPayload, SetUserResponse,
    UserState,
} from '../types/userTypes'

export const fetchRegister = createAsyncThunk<
    RegisteredResponse,
    RegisteredPayload,
    { rejectValue: string }
>('user/register', async (payload, {rejectWithValue}) => {
    const response = await fetch(
        'https://norma.nomoreparties.space/api/auth/register',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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

export const fetchForgotPassword = createAsyncThunk<
    ForgotPasswordResponse, ForgotPasswordPayload, { rejectValue: string }
>('user/forgotPassword', async (payload, {rejectWithValue}) => {
    const response = await fetch('https://norma.nomoreparties.space/api/password-reset', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: payload.email})
    })
    const data = await response.json()
    if (data.success) {
        return data
    } else {
        return rejectWithValue(data.message)
    }
})

export const fetchResetPassword = createAsyncThunk<
    ResetPasswordResponse, ResetPasswordPayload, { rejectValue: string }
>('user/restorePassword', async (payload, {rejectWithValue}) => {

    const response = await fetch(`https://norma.nomoreparties.space/api/password-reset/reset`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password: payload.password, token: payload.code})
    })
    const data = await response.json()
    if (data.success) {
        return data
    } else {
        return rejectWithValue(data.message)
    }
})

export const fetchLogin = createAsyncThunk<
    LoginResponse, LoginPayload, { rejectValue: string }
>('user/login', async (payload, {rejectWithValue}) => {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: payload.email, password: payload.password})
    })
    const data = await response.json()
    if (data.success) {
        return data
    } else {
        return rejectWithValue(data.message)
    }
})

export const fetchRefreshAccessToken = createAsyncThunk<
    RefreshAccessTokenResponse, void, { rejectValue: string }
>('user/refreshAccessToken',
    async (_, {rejectWithValue}) => {
        const response = await fetch('https://norma.nomoreparties.space/api/auth/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: localStorage.getItem('refresh')})
        })
        const data = await response.json()
        if (data.success) {
            return data
        } else {
            return rejectWithValue(data.message)
        }
    })

export const fetchLogout = createAsyncThunk<
    LogoutResponse, void, { rejectValue: string }
>('user/logout', async (_, {rejectWithValue}) => {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: localStorage.getItem('refresh')})
    })
    const data = await response.json()
    if (data.success) {
        return data
    } else {
        return rejectWithValue(data.message)
    }
})

export const getUser = createAsyncThunk<
    GetUserResponse, void, { rejectValue: string }
>('user/getUser', async (_, {rejectWithValue}) => {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('access')!},

    })
    const data = await response.json()
    if (data.success) {
        return data
    } else {
        return rejectWithValue(data.message)
    }
})

export const setUser = createAsyncThunk<
    SetUserResponse, SetUserPayload, { rejectValue: string }
>('user/setUser', async (payload, {rejectWithValue}) => {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('access')!},
        body: JSON.stringify({email: payload.email, name: payload.name, password: payload.password})
    })
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
        user: {name: '', email: ''},
        error: null,
    } as UserState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        }
    },
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
            const refreshToken = action.payload.refreshToken
            if (refreshToken) {
                localStorage.setItem('refresh', refreshToken)
            }
            const accessToken = action.payload.accessToken
            if (accessToken) {
                localStorage.setItem('access', accessToken)
            }
            state.isLogged = true
            state.userLoading = false
        })
        builder.addCase(fetchRegister.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload
            }
            state.userLoading = false
        })
        builder.addCase(fetchForgotPassword.pending, (state) => {
            state.error = null
            state.userLoading = true
        })
        builder.addCase(fetchForgotPassword.fulfilled, (state) => {
            state.error = null
            state.userLoading = false
        })
        builder.addCase(fetchForgotPassword.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload
            }
            state.userLoading = false
        })
        builder.addCase(fetchResetPassword.pending, (state) => {
            state.error = null
            state.userLoading = true
        })
        builder.addCase(fetchResetPassword.fulfilled, (state) => {
            state.error = null
            state.userLoading = false
        })
        builder.addCase(fetchResetPassword.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload
            }
            state.userLoading = false
        })
        builder.addCase(fetchLogin.pending, (state) => {
            state.error = null
            state.userLoading = true
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.error = null
            if (action.payload.user) {
                state.user = action.payload.user
            }
            const refreshToken = action.payload.refreshToken
            if (refreshToken) {
                localStorage.setItem('refresh', refreshToken)
            }
            const accessToken = action.payload.accessToken
            if (accessToken) {
                localStorage.setItem('access', accessToken)
            }
            state.isLogged = true
            state.userLoading = false
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload
            }
            state.userLoading = false
        })
        builder.addCase(fetchRefreshAccessToken.pending, (state) => {
            state.error = null
            state.userLoading = true
        })
        builder.addCase(fetchRefreshAccessToken.fulfilled, (state, action) => {
            state.error = null
            const refreshToken = action.payload.refreshToken
            if (refreshToken) {
                localStorage.setItem('refresh', refreshToken)
            }
            const accessToken = action.payload.accessToken
            if (accessToken) {
                localStorage.setItem('access', accessToken)
            }
            state.isLogged = true
            state.userLoading = false
        })
        builder.addCase(fetchRefreshAccessToken.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload
            }
            state.userLoading = false
        })
        builder.addCase(fetchLogout.pending, (state) => {
            state.error = null
            state.userLoading = true
        })
        builder.addCase(fetchLogout.fulfilled, (state) => {
            state.error = null
            state.user.name = ''
            state.user.email = ''
            state.isLogged = false
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            state.userLoading = false
        })
        builder.addCase(fetchLogout.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload
            }
            state.userLoading = false
        })
        builder.addCase(getUser.pending, (state) => {
            state.error = null
            state.userLoading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.error = null
            if (action.payload.user) {
                state.user = action.payload.user
            }
            state.isLogged = true
            state.userLoading = false
        })
        builder.addCase(getUser.rejected, (state) => {
            state.userLoading = false
        })

    },
})

export const {setError} = userSlice.actions
export default userSlice.reducer
