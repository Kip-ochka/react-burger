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

export interface User {
  name: string
  email: string
}

export interface UserState {
  userLoading: boolean
  isLogged: boolean
  user: User
  error: null | string
}
