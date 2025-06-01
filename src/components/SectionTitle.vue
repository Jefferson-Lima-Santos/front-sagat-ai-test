<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="section-title-container">
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.section-title-container {
  position: relative;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--subtitle-color);
  max-width: 600px;
  margin: 0.25rem auto 1rem auto;
}


@media (max-width: 768px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
}
</style>
