<script setup lang="ts">
import AdminNavbar from '../components/admin/AdminNavbar.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const isDrawerOpen = ref(false);

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
});

const updateDrawerState = (value: boolean) => {
  isDrawerOpen.value = value;
};
</script>

<template>
  <v-layout>
    <AdminNavbar @update:drawer="updateDrawerState" />
    
    <v-main class="bg-grey-lighten-4 admin-main-content">
      <div class="admin-content-wrapper">
        <router-view />
      </div>
    </v-main>
  </v-layout>
</template>

<style scoped>
.admin-main-content {
  transition: padding-left 0.3s ease-in-out;
  padding-left: var(--v-layout-left);
}

.admin-content-wrapper {
  padding: 16px;
}

</style>
