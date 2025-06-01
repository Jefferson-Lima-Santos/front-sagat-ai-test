<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { tokens } from '../../locales/tokens'
import { Motion } from 'motion-v'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const isSubmitting = ref(false)
const showPassword = ref(false)
const registrationSuccess = ref(false)

// Schema de validação com Yup
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

// Usar o hook do vee-validate com yup
const { handleSubmit, values, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
})

// Definir campos para o v-model
const [fullName, fullNameProps] = defineField('fullName')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')

// Função para lidar com o envio do formulário
const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  
  try {
    // Simulando uma chamada API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted successfully:', values)
    
    // Se tudo der certo, mostra sucesso
    registrationSuccess.value = true
    
    // Redirecionaria para login após alguns segundos
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    isSubmitting.value = false
  }
})

// Alterna visibilidade da senha
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="register-container">
    <div class="register-form-card">
      <Motion
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
        <div class="form-header">
          <h1>{{ t(tokens.auth.register.title) }}</h1>
          <p>{{ t(tokens.auth.register.subtitle) }}</p>
        </div>
      </Motion>

      <!-- Mensagem de sucesso -->
      <Motion v-if="registrationSuccess"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.4 }"
        class="success-message"
      >
        <div class="success-icon">✓</div>
        <h2>{{ t(tokens.auth.register.success) }}</h2>
        <p>{{ t(tokens.auth.register.successMessage) }}</p>
      </Motion>

      <!-- Formulário -->
      <Motion v-else
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        <form @submit.prevent="onSubmit" class="register-form">
          <!-- Nome Completo -->
          <div class="form-group">
            <label for="fullName">{{ t(tokens.auth.register.fullName) }}</label>
            <input 
              type="text" 
              id="fullName" 
              v-model="fullName"
              v-bind="fullNameProps"
              :class="{ error: errors.fullName }"
              :placeholder="t(tokens.auth.register.fullNamePlaceholder)"
            />
            <p v-if="errors.fullName" class="error-message">{{ errors.fullName }}</p>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email">{{ t(tokens.auth.register.email) }}</label>
            <input 
              type="email" 
              id="email"
              v-model="email"
              v-bind="emailProps"  
              :class="{ error: errors.email }"
              :placeholder="t(tokens.auth.register.emailPlaceholder)"
            />
            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
          </div>

          <!-- Senha -->
          <div class="form-group">
            <label for="password">{{ t(tokens.auth.register.password) }}</label>
            <div class="password-input-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password"
                v-model="password"
                v-bind="passwordProps"
                :class="{ error: errors.password }"
                :placeholder="t(tokens.auth.register.passwordPlaceholder)"
              />
              <button 
                type="button" 
                class="toggle-password" 
                @click="togglePasswordVisibility" 
                tabindex="-1"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
          </div>

          <!-- Confirmar Senha -->
          <div class="form-group">
            <label for="confirmPassword">{{ t(tokens.auth.register.confirmPassword) }}</label>
            <div class="password-input-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                v-bind="confirmPasswordProps"
                :class="{ error: errors.confirmPassword }"
                :placeholder="t(tokens.auth.register.confirmPasswordPlaceholder)"
              />
            </div>
            <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Botão de Envio -->
          <button 
            type="submit" 
            class="submit-btn" 
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="loader"></span>
            <span>{{ isSubmitting ? t(tokens.auth.register.submitting) : t(tokens.auth.register.submit) }}</span>
          </button>

          <div class="login-link">
            {{ t(tokens.auth.register.alreadyHaveAccount) }}
            <router-link to="/login">{{ t(tokens.auth.register.login) }}</router-link>
          </div>
        </form>
      </Motion>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.register-form-card {
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 2.5rem;
  overflow: hidden;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h1 {
  color: var(--text-color);
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.form-header p {
  color: var(--subtitle-color);
  font-size: 1rem;
  margin: 0;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: var(--text-color);
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.form-group input {
  height: 3rem;
  padding: 0 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.form-group input.error {
  border-color: #e53e3e;
}

.error-message {
  margin-top: 0.5rem;
  color: #e53e3e;
  font-size: 0.8rem;
  margin-bottom: 0;
}

.password-input-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: #718096;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.toggle-password:focus {
  outline: none;
}

.submit-btn {
  height: 3rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background-color: #36996b;
}

.submit-btn:disabled {
  background-color: #9de0c3;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: var(--subtitle-color);
}

.login-link a {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

.success-message {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: rgba(66, 185, 131, 0.1);
  border-radius: 50%;
  font-size: 30px;
  color: var(--primary-color);
  margin: 0 auto 1.5rem;
}

.success-message h2 {
  color: var(--text-color);
  margin-bottom: 0.75rem;
}

.success-message p {
  color: var(--subtitle-color);
  max-width: 360px;
  margin: 0 auto;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .register-form-card {
    padding: 2rem 1.5rem;
  }
}
</style>
