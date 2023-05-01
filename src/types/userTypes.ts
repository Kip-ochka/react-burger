export interface RegisteredPayload {
    name: string
    email: string
    password: string
}

export interface RegisteredResponse {
    success: boolean
    message?: string
    user?: User
    accessToken?: string
    refreshToken?: string
}

export interface ForgotPasswordPayload {
    email: string
}

export interface ForgotPasswordResponse {
    success: boolean
    message: string
}

export interface ResetPasswordPayload {
    password: string
    code: string
}

export interface ResetPasswordResponse {
    success: boolean
    message: string
}

export interface LoginPayload {
    email: string
    password: string
}

export interface LoginResponse {
    success: boolean
    accessToken: string
    refreshToken: string
    user: User
}

export interface RefreshAccessTokenResponse {
    success: boolean,
    accessToken: string,
    refreshToken: string
}

export interface LogoutResponse {
    success: boolean
    message: string
}

export interface SetUserPayload {
    name?: string
    email?: string
    password?: string
}

export interface SetUserResponse {
    success: true,
    user: User
}

export interface User {
    name: string
    email: string
}

export interface GetUserResponse {
    success: boolean,
    user: User
}

export interface UserState {
    userLoading: boolean
    isLogged: boolean
    user: User
    error: null | string
}
