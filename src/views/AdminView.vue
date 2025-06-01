<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { tokens } from '../locales/tokens'
import { Motion } from 'motion-v'

const { t } = useI18n()
</script>

<template>
  <div class="admin-dashboard">
    <Motion 
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
    >
      <h1 class="admin-title">{{ t(tokens.admin.dashboard) }}</h1>
    </Motion>
    
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.5, delay: 0.2 }"
    >
      <div class="welcome-card">
        <div class="welcome-content">
          <h2>{{ t(tokens.admin.welcome) }}</h2>
          <p>{{ t(tokens.admin.welcomeMessage) }}</p>
        </div>
      </div>
    </Motion>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 1rem 0;
}

.admin-title {
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.welcome-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
}

.welcome-content h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.welcome-content p {
  color: var(--subtitle-color);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .admin-title {
    font-size: 1.5rem;
  }
  
  .welcome-card {
    padding: 1.5rem;
  }
}
</style>
