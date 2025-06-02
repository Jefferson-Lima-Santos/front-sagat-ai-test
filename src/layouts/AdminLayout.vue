<script setup lang="ts">
import AdminNavbar from '../components/admin/AdminNavbar.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
});
</script>

<template>
  <v-layout>
    <AdminNavbar />
    
    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-4">
        <slot></slot>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: #f8fafc;
}

.admin-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

@media (max-width: 768px) {
  .admin-content {
    padding: 1.5rem 1rem;
  }
}
</style>
