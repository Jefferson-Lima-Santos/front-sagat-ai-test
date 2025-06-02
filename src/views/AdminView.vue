<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { tokens } from '../locales/tokens';
import { useAuthStore } from '../stores/auth';

const { t } = useI18n();
const authStore = useAuthStore();
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card flat class="mx-auto mt-4">
        <v-card-title class="text-h4 mb-2">{{ t(tokens.admin.dashboard) }}</v-card-title>
        
        <v-card-text>
          <v-row>
            <v-col cols="12" md="8">
              <v-card class="mb-4">
                <v-card-item>
                  <v-card-title>
                    {{ t(tokens.admin.welcome) }}, {{ authStore.user?.name || 'Usuário' }}
                  </v-card-title>
                  <v-card-subtitle class="mt-2">
                    {{ t(tokens.admin.welcomeMessage) }}
                  </v-card-subtitle>
                </v-card-item>
              </v-card>
              
              <v-row>
                <v-col cols="12" md="6">
                  <v-card height="180" color="primary">
                    <v-card-item>
                      <v-card-title class="text-white">Quick Access</v-card-title>
                    </v-card-item>
                    <v-card-text class="text-white">
                      Access frequently used features
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-card height="180" class="bg-indigo">
                    <v-card-item>
                      <v-card-title class="text-white">Statistics</v-card-title>
                    </v-card-item>
                    <v-card-text class="text-white">
                      View your account statistics
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-card class="mb-4">
                <v-card-item>
                  <v-card-title>Profile</v-card-title>
                </v-card-item>
                <v-card-text class="d-flex flex-column align-center">
                  <v-avatar size="100" color="primary" class="mb-4">
                    <span class="text-h4 text-white">
                      {{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : 'U' }}
                    </span>
                  </v-avatar>
                  <div class="text-h6">{{ authStore.user?.name || 'User' }}</div>
                  <div class="text-body-2 text-medium-emphasis">{{ authStore.user?.email || 'email@example.com' }}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn block variant="outlined">Edit Profile</v-btn>
                </v-card-actions>
              </v-card>
              
              <v-card class="mb-4">
                <v-list>
                  <v-list-item prepend-icon="mdi-account-cog-outline">
                    <v-list-item-title>Account Settings</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-shield-account-outline">
                    <v-list-item-title>Privacy</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-bell-outline">
                    <v-list-item-title>Notifications</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
