import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
    ForgotPasswordPayload, ForgotPasswordResponse, GetUserResponse, LoginPayload,
    LoginResponse, LogoutResponse, RefreshAccessTokenResponse, RegisteredPayload,
    RegisteredResponse, ResetPasswordPayload, ResetPasswordResponse, SetUserPayload,
    SetUserResponse, UserState,
} from '../types/userTypes'
import {request} from "../utils/helpers/checkResponse";

export const fetchRegister = createAsyncThunk<
    RegisteredResponse, RegisteredPayload, { rejectValue: string }
>('user/register', async (payload, {rejectWithValue}) => {
    try {
        return await request('/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        })
    } catch (e) {
        return rejectWithValue(e as string)
    }
})

export const fetchForgotPassword = createAsyncThunk<
    ForgotPasswordResponse, ForgotPasswordPayload, { rejectValue: string }
>('user/forgotPassword', async (payload, {rejectWithValue}) => {
    try {
        return await request('/password-reset', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: payload.email})
        })
    } catch (e) {
        return rejectWithValue(e as string)
    }
})

export const fetchResetPassword = createAsyncThunk<
    ResetPasswordResponse, ResetPasswordPayload, { rejectValue: string }
>('user/restorePassword', async (payload, {rejectWithValue}) => {
    try {
        return await request('/password-reset/reset', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password: payload.password, token: payload.code})
        })
    } catch (e) {
        return rejectWithValue(e as string)
    }
})

export const fetchLogin = createAsyncThunk<
    LoginResponse, LoginPayload, { rejectValue: string }
>('user/login', async (payload, {rejectWithValue}) => {
    try {
        return await request('/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: payload.email, password: payload.password})
        })
    } catch (e) {
        return rejectWithValue(e as string)
    }
})

export const fetchRefreshAccessToken = createAsyncThunk<
    RefreshAccessTokenResponse, void, { rejectValue: string }
>('user/refreshAccessToken',
    async (_, {rejectWithValue}) => {
        try {
            return await request('/auth/token', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: localStorage.getItem('refresh')})
            })
        } catch (e) {
            return rejectWithValue(e as string)
        }
    })

export const fetchLogout = createAsyncThunk<
    LogoutResponse, void, { rejectValue: string }
>('user/logout', async (_, {rejectWithValue}) => {
    try {
        return await request('/auth/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: localStorage.getItem('refresh')})
        })
    } catch (e) {
        return rejectWithValue(e as string)
    }
})

export const getUser = createAsyncThunk<
    GetUserResponse, void, { rejectValue: string }
>('user/getUser', async (_, {rejectWithValue}) => {
    try {
        return await request('/auth/user', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('access')!},

        })
    } catch (e) {
        return rejectWithValue(e as string)
    }
})

export const setUser = createAsyncThunk<
    SetUserResponse, SetUserPayload, { rejectValue: string }
>('user/setUser', async (payload, {rejectWithValue}) => {
    try {
        return await request('/auth/user', {
            method: 'PATCH',
            credentials: "same-origin",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer",
            headers: {'Content-Type': 'application/json', Authorization: localStorage.getItem('access')!},
            body: JSON.stringify(payload.data)
        })
    } catch (e) {
        return rejectWithValue(e as string)
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
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.error = null
                state.userLoading = true
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
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
            .addCase(fetchRegister.rejected, (state, action) => {
                if (action.payload) {
                    state.error = `Регистрация прошла с ошибкой, регистрация не выполнена. Причина: 
                    ${action.payload}`
                }
                state.userLoading = false
            })
            .addCase(fetchForgotPassword.pending, (state) => {
                state.error = null
                state.userLoading = true
            })
            .addCase(fetchForgotPassword.fulfilled, (state) => {
                state.error = null
                state.userLoading = false
            })
            .addCase(fetchForgotPassword.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.userLoading = false
            })
            .addCase(fetchResetPassword.pending, (state) => {
                state.error = null
                state.userLoading = true
            })
            .addCase(fetchResetPassword.fulfilled, (state) => {
                state.error = null
                state.userLoading = false
            })
            .addCase(fetchResetPassword.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.userLoading = false
            })
            .addCase(fetchLogin.pending, (state) => {
                state.error = null
                state.userLoading = true
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
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
            .addCase(fetchLogin.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.userLoading = false
            })
            .addCase(fetchRefreshAccessToken.pending, (state) => {
                state.error = null
                state.userLoading = true
            })
            .addCase(fetchRefreshAccessToken.fulfilled, (state, action) => {
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
            .addCase(fetchRefreshAccessToken.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.userLoading = false
            })
            .addCase(fetchLogout.pending, (state) => {
                state.error = null
                state.userLoading = true
            })
            .addCase(fetchLogout.fulfilled, (state) => {
                state.error = null
                state.user.name = ''
                state.user.email = ''
                state.isLogged = false
                localStorage.removeItem('refresh')
                localStorage.removeItem('access')
                state.userLoading = false
            })
            .addCase(fetchLogout.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.userLoading = false
            })
            .addCase(getUser.pending, (state) => {
                state.error = null
                state.userLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.error = null
                if (action.payload.user) {
                    state.user = action.payload.user
                }
                state.isLogged = true
                state.userLoading = false
            })
            .addCase(getUser.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.userLoading = false
            })
            .addCase(setUser.pending, (state) => {
                state.error = null
                state.userLoading = true
            })
            .addCase(setUser.fulfilled, (state, action) => {
                state.error = null
                if (action.payload.user) {
                    state.user = action.payload.user
                }
                state.isLogged = true
                state.userLoading = false
            })
            .addCase(setUser.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.userLoading = false
            })

    },
})

export const {setError} = userSlice.actions
export default userSlice.reducer
