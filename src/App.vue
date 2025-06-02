<script setup lang="ts">
// Removidos os imports dos componentes que agora são gerenciados pelos layouts
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #42b983;
  --text-color: #333;
  --subtitle-color: #555;
  --background-light: #f8fafc;
  --background-section: #f0f4f8;
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --background-card-color: #e0e7ff4f;
}

body {
  background-color: #fff;
  color: var(--text-color);
  line-height: 1.6;
}

p {
  margin: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
