<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { tokens } from '../../locales/tokens'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
const dropdownRef = ref<HTMLDivElement | null>(null)
document.addEventListener('click', (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
})
</script>

<template>
  <nav class="admin-navbar">
    <div class="admin-navbar-container">
      <router-link to="/admin" class="logo-link">
        <img alt="Sagat logo" class="logo" src="../../assets/sagat-icon.png" />
        <span class="admin-title">SAGAT Admin</span>
      </router-link>

      <div class="admin-navbar-right">
        <div class="avatar-container" ref="dropdownRef">
          <button @click="toggleDropdown" class="avatar-button">
            <div class="avatar">
              {{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : 'U' }}
            </div>
          </button>

          <div v-if="isDropdownOpen" class="dropdown-menu">
            <div class="dropdown-user-info">
              <div class="dropdown-avatar">
                {{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div class="dropdown-user-details">
                <span class="user-name">{{ authStore.user?.name || 'User' }}</span>
                <span class="user-email">{{ authStore.user?.email || 'email@example.com' }}</span>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <button @click="handleLogout" class="dropdown-item logout-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>{{ t(tokens.admin.logout) }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.admin-navbar {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 0.75rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.admin-navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
}

.logo {
  height: 40px;
  width: auto;
}

.admin-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin-left: 0.75rem;
}

.admin-navbar-right {
  display: flex;
  align-items: center;
}

.avatar-container {
  position: relative;
}

.avatar-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 240px;
  padding: 0.75rem 0;
  z-index: 10;
}

.dropdown-user-info {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
}

.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 0.75rem;
}

.dropdown-user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  color: var(--subtitle-color);
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-divider {
  height: 1px;
  background-color: #e2e8f0;
  margin: 0.5rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 0.75rem;
}

.logout-button {
  color: #e53e3e;
}
</style>
