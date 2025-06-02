import apiClient from './client'

// Types
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

// Auth API service
export const authApi = {
  /**
   * Register a new user
   * @param data User registration data
   * @returns Promise with the registration response
   */
  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/v1/auth/sign_up', data)
    return response.data
  },

  /**
   * Login user
   * @param data User login data
   * @returns Promise with the login response
   */
  signIn: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.put('/v1/auth/sign_in', data)
    return response.data
  }
}
