import apiClient from './client'

export interface SignUpRequest {
  user: {
    name: string
    email: string
    password: string
  }
}

export interface LoginRequest {
  user: {
    email: string
    password: string
  }
}

export interface AuthResponse {
  success: boolean
  token: string
  exp: number
}

export interface UserInfo {
  uid: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface UserInfoResponse {
  user: UserInfo
}

export const authApi = {
  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/v1/auth/sign_up', data)
    return response.data
  },

  signIn: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.put('/v1/auth/sign_in', data)
    return response.data
  },
  
  getUserInfo: async (): Promise<UserInfoResponse> => {
    const response = await apiClient.get('/v1/users/infos')
    return response.data
  }
}
