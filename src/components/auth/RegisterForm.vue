<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { tokens } from '../../locales/tokens'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import type { SignUpRequest } from '../../api/auth'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const isSubmitting = ref(false)
const showPassword = ref(false)
const submitSuccess = ref(false)

const schema = yup.object({
  fullName: yup.string()
    .required(t(tokens.auth.validation.nameRequired))
    .min(3, t(tokens.auth.validation.nameLength)),
  email: yup.string()
    .required(t(tokens.auth.validation.emailRequired))
    .email(t(tokens.auth.validation.invalidEmail)),
  password: yup.string()
    .required(t(tokens.auth.validation.passwordRequired))
    .min(8, t(tokens.auth.validation.passwordLength)),
  confirmPassword: yup.string()
    .required(t(tokens.auth.validation.passwordRequired))
    .oneOf([yup.ref('password')], t(tokens.auth.validation.passwordMatch))
})

const { handleSubmit, values, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  
  try {
    const userData: SignUpRequest = {
      user: {
        name: values.fullName,
        email: values.email,
        password: values.password
      }
    }
    
    await authStore.registerUser(userData)
    submitSuccess.value = true
    
    // Redirect to admin page after a brief delay
    setTimeout(() => {
      router.push('/admin')
    }, 1500)
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <v-container fluid class="fill-height bg-grey-lighten-4">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="5">
        <v-card
          class="mx-auto"
          min-width="320px"
          max-width="600px"
          :elevation="4"
        >
          <v-card-title class="text-center pt-6 pb-0">
            <h1 class="text-h4 font-weight-bold">{{ t(tokens.auth.register.title) }}</h1>
            <p class="text-subtitle-1 text-medium-emphasis mt-2">{{ t(tokens.auth.register.subtitle) }}</p>
          </v-card-title>
          
          <v-card-text class="pa-6 pt-4">
            <v-fade-transition>
              <div v-if="submitSuccess" class="text-center py-6">
                <v-icon color="success" size="80" icon="mdi-check-circle-outline"></v-icon>
                <h2 class="text-h5 font-weight-bold mt-4">{{ t(tokens.auth.register.success) }}</h2>
                <p class="mt-2 text-medium-emphasis">{{ t(tokens.auth.register.successMessage) }}</p>
              </div>
              
              <v-form v-else @submit.prevent="onSubmit">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="values.fullName"
                      :label="t(tokens.auth.register.fullName)"
                      :placeholder="t(tokens.auth.register.fullNamePlaceholder)"
                      :error-messages="errors.fullName"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-outline"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-text-field
                      v-model="values.email"
                      :label="t(tokens.auth.register.email)"
                      :placeholder="t(tokens.auth.register.emailPlaceholder)"
                      :error-messages="errors.email"
                      variant="outlined"
                      prepend-inner-icon="mdi-email-outline"
                      type="email"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-text-field
                      v-model="values.password"
                      :label="t(tokens.auth.register.password)"
                      :placeholder="t(tokens.auth.register.passwordPlaceholder)"
                      :error-messages="errors.password"
                      :type="showPassword ? 'text' : 'password'"
                      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      variant="outlined"
                      prepend-inner-icon="mdi-lock-outline"
                      required
                      @click:append-inner="showPassword = !showPassword"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-text-field
                      v-model="values.confirmPassword"
                      :label="t(tokens.auth.register.confirmPassword)"
                      :placeholder="t(tokens.auth.register.confirmPasswordPlaceholder)"
                      :error-messages="errors.confirmPassword"
                      :type="showPassword ? 'text' : 'password'"
                      variant="outlined"
                      prepend-inner-icon="mdi-lock-check-outline"
                      required
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-btn
                      type="submit"
                      color="primary"
                      size="large"
                      block
                      :loading="isSubmitting"
                    >
                      {{ isSubmitting ? t(tokens.auth.register.submitting) : t(tokens.auth.register.submit) }}
                    </v-btn>
                  </v-col>
                </v-row>
                
                <div class="text-center mt-4">
                  <span class="text-medium-emphasis">{{ t(tokens.auth.register.alreadyHaveAccount) }}</span>
                  <router-link to="/login" class="text-decoration-none font-weight-medium ml-1">
                    {{ t(tokens.auth.register.login) }}
                  </router-link>
                </div>
              </v-form>
            </v-fade-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.bg-grey-lighten-4 {
  background-color: #f5f7fa !important;
}

.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

.text-h4 {
  font-size: 1.5rem;
  line-height: 2rem;
}

.font-weight-bold {
  font-weight: 700;
}

.text-subtitle-1 {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-medium-emphasis {
  color: rgba(0, 0, 0, 0.54);
}

.py-6 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.pa-6 {
  padding: 1.5rem !important;
}

.pt-4 {
  padding-top: 1rem !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.text-center {
  text-align: center !important;
}

.v-card {
  border-radius: 0.5rem;
  overflow: hidden;
}

.v-card-title {
  border-bottom: 1px solid #e0e0e0;
}

.v-card-text {
  position: relative;
}

.v-fade-transition {
  transition: opacity 0.4s ease;
}

.v-icon {
  font-size: 2.5rem;
}

.v-text-field {
  margin-bottom: 1.5rem;
}

.v-btn {
  text-transform: none;
  border-radius: 0.5rem;
}

.v-btn:disabled {
  background-color: #e0e0e0;
  color: #a0a0a0;
}

.v-btn.loading {
  position: relative;
}

.v-btn.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media (max-width: 640px) {
  .v-card {
    padding: 1rem;
  }
  
  .text-h4 {
    font-size: 1.25rem;
  }
}
</style>
