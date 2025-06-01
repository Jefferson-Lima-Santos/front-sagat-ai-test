import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SignUpRequest, SignUpResponse } from '../api/auth'
import { authApi } from '../api/auth'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null)
    const tokenExpiration = ref<number | null>(null)
    const user = ref<{ name?: string; email?: string } | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => {
        if (!token.value || !tokenExpiration.value) return false

        const now = Math.floor(Date.now() / 1000)
        return tokenExpiration.value > now
    })

    async function registerUser(userData: SignUpRequest): Promise<SignUpResponse> {
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
            }

            return data
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Falha ao registrar. Tente novamente.'
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
    }

    function restoreSession(savedState: any) {
        if (savedState) {
            token.value = savedState.token || null
            tokenExpiration.value = savedState.tokenExpiration || null
            user.value = savedState.user || null
        }
    }

    return {
        token,
        tokenExpiration,
        user,
        loading,
        error,
        isAuthenticated,
        registerUser,
        logout,
        restoreSession
    }
})
