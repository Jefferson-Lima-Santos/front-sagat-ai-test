<script setup lang="ts">
import AdminNavbar from '../components/admin/AdminNavbar.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

// Verify authentication on mount
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
      <router-view />
    </v-main>
  </v-layout>
</template>

<style scoped>
.v-main {
  padding-left: 70px; /* Ajuste para o rail mode da navbar */
}

@media (max-width: 960px) {
  .v-main {
    padding-left: 0;
  }
}
</style>
