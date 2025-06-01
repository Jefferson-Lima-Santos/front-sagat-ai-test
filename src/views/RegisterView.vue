<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { tokens } from '../locales/tokens'
import { Motion } from 'motion-v'
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
    return
  }
  
  loading.value = true
  errors.api = ''
  
  try {
    const userData: SignUpRequest = {
      user: {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      }
    }


    await authStore.registerUser(userData)
    submitSuccess.value = true
    
    formData.fullName = ''
    formData.email = ''
    formData.password = ''
    formData.confirmPassword = ''
    
    setTimeout(() => {
      router.push('/')
    }, 3000)
    
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
  <div class="register-view">
    <div class="register-form-container">
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        <div class="form-header">
          <h2>{{ t(tokens.auth.register.title) }}</h2>
          <p>{{ t(tokens.auth.register.subtitle) }}</p>
        </div>
      </Motion>
      
      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.6, delay: 0.1 }"
      >
        <form @submit.prevent="handleSubmit" class="register-form">
          <div v-if="submitSuccess" class="success-message">
            <div class="success-icon">✓</div>
            <h3>{{ t(tokens.auth.register.success) }}</h3>
            <p>{{ t(tokens.auth.register.successMessage) }}</p>
          </div>
          
          <template v-else>
            <div v-if="errors.api" class="api-error-message">
              {{ errors.api }}
            </div>

            <div class="form-group">
              <label for="fullName">{{ t(tokens.auth.register.fullName) }}</label>
              <input 
                type="text" 
                id="fullName" 
                v-model="formData.fullName" 
                :placeholder="t(tokens.auth.register.fullNamePlaceholder)" 
                :class="{ 'has-error': errors.fullName }"
              />
              <p class="error-message" v-if="errors.fullName">{{ errors.fullName }}</p>
            </div>
            
            <div class="form-group">
              <label for="email">{{ t(tokens.auth.register.email) }}</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                :placeholder="t(tokens.auth.register.emailPlaceholder)" 
                :class="{ 'has-error': errors.email }"
              />
              <p class="error-message" v-if="errors.email">{{ errors.email }}</p>
            </div>
            
            <div class="form-group">
              <label for="password">{{ t(tokens.auth.register.password) }}</label>
              <div class="password-input">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="formData.password" 
                  :placeholder="t(tokens.auth.register.passwordPlaceholder)" 
                  :class="{ 'has-error': errors.password }"
                />
                <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                  <span v-if="showPassword">👁️‍🗨️</span>
                  <span v-else>👁️</span>
                </button>
              </div>
              <p class="error-message" v-if="errors.password">{{ errors.password }}</p>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">{{ t(tokens.auth.register.confirmPassword) }}</label>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="formData.confirmPassword" 
                :placeholder="t(tokens.auth.register.confirmPasswordPlaceholder)" 
                :class="{ 'has-error': errors.confirmPassword }"
              />
              <p class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
            </div>
            
            <button type="submit" class="submit-button" :disabled="loading">
              <span v-if="loading" class="loading-spinner"></span>
              {{ loading ? t(tokens.auth.register.submitting) : t(tokens.auth.register.submit) }}
            </button>
            
            <div class="login-link">
              {{ t(tokens.auth.register.alreadyHaveAccount) }} 
              <router-link to="/login">{{ t(tokens.auth.register.login) }}</router-link>
            </div>
          </template>
        </form>
      </Motion>
    </div>
  </div>
</template>

<style scoped>
.register-view {
  min-height: calc(100vh - 200px);
  padding: 2rem 1rem;
  background-color: var(--background-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--subtitle-color);
  font-size: 1rem;
}

.register-form {
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.form-group input.has-error {
  border-color: #e53e3e;
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--subtitle-color);
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-button:hover {
  background-color: #3a9d6e;
}

.submit-button:disabled {
  background-color: #90ceb3;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--subtitle-color);
}

.login-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

.success-message {
  text-align: center;
  padding: 2rem 1rem;
}

.success-icon {
  width: 60px;
  height: 60px;
  background-color: rgba(66, 185, 131, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0 auto 1rem;
}

.success-message h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.api-error-message {
  background-color: rgba(229, 62, 62, 0.1);
  color: #e53e3e;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  border-left: 3px solid #e53e3e;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .register-form-container {
    padding: 1rem;
  }
  
  .register-form {
    padding: 1.5rem;
  }
}
</style>
