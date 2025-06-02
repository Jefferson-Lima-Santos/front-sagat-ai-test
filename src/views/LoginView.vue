<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { tokens } from '../locales/tokens'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const showPassword = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  
  if (!email.value.trim()) {
    error.value = t(tokens.auth.validation.emailRequired)
    return
  }
  
  if (!password.value) {
    error.value = t(tokens.auth.validation.passwordRequired)
    return
  }
  
  loading.value = true
  
  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value
    })
    
    if (success) {
      router.push('/admin')
    }
  } catch (err: any) {
    error.value = err.message || t(tokens.auth.login.invalidCredentials)
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card 
          min-width="440px"
          max-width="550px"
          class="mx-auto pa-4" 
          elevation="4"
        >
          <div class="d-flex justify-space-between align-center mb-2">
            <v-btn 
              icon="mdi-arrow-left" 
              variant="text" 
              color="primary" 
              to="/" 
              title="Voltar à página inicial"
            ></v-btn>
            <div></div>
          </div>
          
          <v-card-title class="text-center pt-4 pb-2">
            <h1 class="text-h4 font-weight-bold">{{ t(tokens.auth.login.title) }}</h1>
            <p class="text-body-1 text-medium-emphasis mt-2">{{ t(tokens.auth.login.subtitle) }}</p>
          </v-card-title>
          
          <v-card-text>
            <v-alert
              v-if="error"
              type="error"
              variant="tonal"
              closable
              class="mb-4"
            >
              {{ error }}
            </v-alert>
            
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                :label="t(tokens.auth.login.email)"
                type="email"
                variant="outlined"
                prepend-inner-icon="mdi-email-outline"
                :placeholder="t(tokens.auth.login.emailPlaceholder)"
                required
                autofocus
                class="mb-3"
              ></v-text-field>
              
              <v-text-field
                v-model="password"
                :label="t(tokens.auth.login.password)"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :placeholder="t(tokens.auth.login.passwordPlaceholder)"
                required
                @click:append-inner="togglePasswordVisibility"
                class="mb-4"
              ></v-text-field>
              
              <div class="d-flex justify-end mb-4">
                <v-btn
                  variant="text"
                  color="primary"
                  density="comfortable"
                  class="text-caption"
                  :to="'/forgot-password'"
                >
                  {{ t(tokens.auth.login.forgotPassword) }}
                </v-btn>
              </div>
              
              <v-btn
                type="submit"
                color="primary"
                block
                size="large"
                :loading="loading"
                class="mb-6"
              >
                {{ t(tokens.auth.login.submit) }}
              </v-btn>
              
              <div class="text-center">
                <span class="text-body-2">{{ t(tokens.auth.login.noAccount) }}</span>
                <v-btn
                  variant="text"
                  color="primary"
                  density="comfortable"
                  :to="'/register'"
                  class="text-body-2 font-weight-medium ml-1"
                >
                  {{ t(tokens.auth.login.signUp) }}
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
