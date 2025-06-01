<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { tokens } from '../locales/tokens'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import type { SignUpRequest } from '../api/auth'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

// Form state
const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  api: ''
})

const loading = ref(false)
const showPassword = ref(false)
const submitSuccess = ref(false)

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = () => {
  let isValid = true
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  if (!formData.fullName.trim()) {
    errors.fullName = t(tokens.auth.validation.nameRequired)
    isValid = false
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = t(tokens.auth.validation.nameLength)
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = t(tokens.auth.validation.emailRequired)
    isValid = false
  } else if (!validateEmail(formData.email)) {
    errors.email = t(tokens.auth.validation.invalidEmail)
    isValid = false
  }

  if (!formData.password) {
    errors.password = t(tokens.auth.validation.passwordRequired)
    isValid = false
  } else if (formData.password.length < 8) {
    errors.password = t(tokens.auth.validation.passwordLength)
    isValid = false
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = t(tokens.auth.validation.passwordMatch)
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  errors.api = '';
  
  try {
    const userData: SignUpRequest = {
      user: {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      }
    };

    const resp = await authStore.registerUser(userData);

    if (!resp) {
      errors.api = authStore.error || 'Ocorreu um erro ao realizar o cadastro';
      return;
    };
    submitSuccess.value = true;
    
    formData.fullName = '';
    formData.email = '';
    formData.password = '';
    formData.confirmPassword = '';
    
    setTimeout(() => {
      router.push('/admin');
    }, 1500);
    
  } catch (error: any) {
    errors.api = authStore.error || 'Ocorreu um erro ao realizar o cadastro'
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <v-container class="register-view fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="5">
        <v-card 
          class="register-form-container mx-auto pa-4" 
          elevation="8"
          min-width="440px"
          max-width="550px"
        >
          <v-card-title class="text-center text-h4 mb-2">
            {{ t(tokens.auth.register.title) }}
          </v-card-title>
          <v-card-subtitle class="text-center mb-6">
            {{ t(tokens.auth.register.subtitle) }}
          </v-card-subtitle>
          
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <div v-if="submitSuccess" class="text-center pa-4">
                <v-avatar color="success" size="60" class="mb-4">
                  <v-icon icon="mdi-check" color="white" size="x-large"></v-icon>
                </v-avatar>
                <h3 class="text-h5 mb-2">{{ t(tokens.auth.register.success) }}</h3>
                <p>{{ t(tokens.auth.register.successMessage) }}</p>
              </div>
              
              <template v-else>
                <v-alert
                  v-if="errors.api"
                  type="error"
                  variant="tonal"
                  closable
                  class="mb-4"
                >
                  {{ errors.api }}
                </v-alert>

                <v-text-field
                  v-model="formData.fullName"
                  :label="t(tokens.auth.register.fullName)"
                  :placeholder="t(tokens.auth.register.fullNamePlaceholder)"
                  :error-messages="errors.fullName"
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>
                
                <v-text-field
                  v-model="formData.email"
                  :label="t(tokens.auth.register.email)"
                  :placeholder="t(tokens.auth.register.emailPlaceholder)"
                  :error-messages="errors.email"
                  type="email"
                  variant="outlined"
                  class="mb-2"
                ></v-text-field>
                
                <v-text-field
                  v-model="formData.password"
                  :label="t(tokens.auth.register.password)"
                  :placeholder="t(tokens.auth.register.passwordPlaceholder)"
                  :error-messages="errors.password"
                  :type="showPassword ? 'text' : 'password'"
                  variant="outlined"
                  class="mb-2"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="togglePasswordVisibility"
                ></v-text-field>
                
                <v-text-field
                  v-model="formData.confirmPassword"
                  :label="t(tokens.auth.register.confirmPassword)"
                  :placeholder="t(tokens.auth.register.confirmPasswordPlaceholder)"
                  :error-messages="errors.confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>
                
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  size="large"
                  :loading="loading"
                  class="mb-6"
                >
                  {{ loading ? t(tokens.auth.register.submitting) : t(tokens.auth.register.submit) }}
                </v-btn>
                
                <div class="text-center">
                  {{ t(tokens.auth.register.alreadyHaveAccount) }}
                  <router-link to="/login" class="text-primary font-weight-medium">
                    {{ t(tokens.auth.register.login) }}
                  </router-link>
                </div>
              </template>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.register-view {
  background-color: var(--background-light);
  min-height: calc(100vh - 140px);
}

@media (max-width: 600px) {
  .register-view {
    padding: 16px;
  }
  
  .register-form-container {
    width: 100%;
  }
}

@media (min-width: 960px) {
  .register-form-container {
    width: 100%;
    min-width: 500px;
  }
}
</style>
