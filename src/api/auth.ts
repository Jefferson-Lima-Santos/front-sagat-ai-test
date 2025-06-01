import apiClient from './client'

export interface SignUpRequest {
  user: {
    name: string
    email: string
    password: string
  }
}

export interface SignUpResponse {
  success: boolean
  token: string
  exp: number
}

export const authApi = {
  signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
    const response = await apiClient.post('/v1/auth/sign_up', data)
    return response.data
  },
}
