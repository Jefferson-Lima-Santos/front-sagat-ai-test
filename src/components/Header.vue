<script setup lang="ts">
import LanguageSwitch from './LanguageSwitch.vue'
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted } from 'vue'
import { tokens } from '../locales/tokens'

const { t } = useI18n()

// Detectar tamanho da tela para responsividade
const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 900
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" class="logo-link">
        <img 
          alt="Sagat logo" 
          class="logo" 
          src="../assets/sagat-icon.png" 
          :class="{ mobile: isMobile }"
        />
      </router-link>
      <div class="header-actions">
        <button class="header-btn login">{{ t(tokens.header.login) }}</button>
        <button class="header-btn signup">{{ t(tokens.header.signup) }}</button>
        <LanguageSwitch />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background: #fff;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo-link {
  display: block;
  text-decoration: none;
}

.logo {
  height: 80px;
  width: auto;
  display: block;
  transition: height 0.3s ease;
}

.logo.mobile {
  height: 40px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-btn {
  border: none;
  background: transparent;
  font-size: 1rem;
  padding: 0.5rem 1.1rem;
  border-radius: 6px;
  cursor: pointer;
}

.header-btn.login {
  color: #222;
}

.header-btn.signup {
  background: var(--primary-color);
  color: #fff;
  font-weight: bold;
}

.header-btn.signup:hover {
  background: #36996b;
}

.header-btn.login:hover {
  background: #f0f4f8;
}

/* Responsive styles */
@media (max-width: 900px) {
  .header-content {
    padding: 0 1rem;
  }
  
  .header-actions {
    gap: 0.5rem;
  }
  
  .header-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 600px) {
  .header-btn.login {
    display: none;
  }
}
</style>
