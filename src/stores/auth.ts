import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { SignUpRequest, LoginRequest } from '../api/auth'
import { authApi } from '../api/auth'

const loadFromStorage = (key: string) => {
  const item = localStorage.getItem(key)
  try {
    return item ? JSON.parse(item) : null
  } catch (e) {
    console.error(`Erro ao carregar ${key} do localStorage:`, e)
    return null
  }
}

const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(loadFromStorage('token'))
  const tokenExpiration = ref<number | null>(loadFromStorage('tokenExpiration'))
  const user = ref<{ name?: string; email?: string } | null>(loadFromStorage('user'))
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => {
    if (!token.value || !tokenExpiration.value) return false

    const now = Math.floor(Date.now() / 1000)
    const isValid = tokenExpiration.value > now;
    return isValid
  })

  watch(() => token.value, (newVal) => {
    if (newVal) {
      saveToStorage('token', newVal)
    } else {
      localStorage.removeItem('token')
    }
  }, { deep: true })

  watch(() => tokenExpiration.value, (newVal) => {
    if (newVal) {
      saveToStorage('tokenExpiration', newVal)
    } else {
      localStorage.removeItem('tokenExpiration')
    }
  }, { deep: true })

  watch(() => user.value, (newVal) => {
    if (newVal) {
      saveToStorage('user', newVal)
    } else {
      localStorage.removeItem('user')
    }
  }, { deep: true })

  async function registerUser(userData: SignUpRequest) {
    loading.value = true
    error.value = null

    try {
      const data = await authApi.signUp(userData)

      if (data.success) {
        token.value = data.token
        tokenExpiration.value = data.exp

        user.value = {
          name: userData.user.name,
          email: userData.user.email
        }

        return true
      }

      return false
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Falha ao registrar. Tente novamente.'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }
  async function login(credentials: { email: string; password: string }) {
    loading.value = true
    error.value = null

    try {
      console.log('Iniciando login:', { email: credentials.email })
      const loginData: LoginRequest = {
        user: {
          email: credentials.email,
          password: credentials.password
        }
      }

      const data = await authApi.signIn(loginData)

      if (data.success) {
        token.value = data.token
        tokenExpiration.value = data.exp

        user.value = {
          email: credentials.email,
        }

        return true
      }

      return false
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Credenciais inválidas'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    tokenExpiration.value = null
    user.value = null
    
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
    localStorage.removeItem('user')
    
  }

  function initializeFromStorage() {
    const storedToken = loadFromStorage('token')
    const storedExpiration = loadFromStorage('tokenExpiration')
    const storedUser = loadFromStorage('user')
    if (storedToken && storedExpiration && storedUser) {
      token.value = storedToken
      tokenExpiration.value = storedExpiration
      user.value = storedUser
    }
  }

  initializeFromStorage()

  return {
    token,
    tokenExpiration,
    user,
    loading,
    error,
    isAuthenticated,
    registerUser,
    login,
    logout
  }
})
