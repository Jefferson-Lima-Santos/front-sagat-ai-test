<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { tokens } from '@/locales/tokens';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <v-container fluid class="not-found-container fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
        <v-card elevation="0" class="bg-transparent">
          <v-card-text>
            <h1 class="error-code">404</h1>
            <h2 class="text-h4 mb-4">{{ t(tokens.notFound.title) }}</h2>
            <p class="text-body-1 mb-8">{{ t(tokens.notFound.message) }}</p>
            
            <div class="d-flex justify-center gap-4">
              <v-btn
                color="primary"
                variant="elevated"
                size="large"
                @click="goHome"
              >
                {{ t(tokens.notFound.goHome) }}
              </v-btn>
              
              <v-btn
                color="grey-darken-1"
                variant="outlined"
                size="large"
                @click="goBack"
              >
                {{ t(tokens.notFound.goBack) }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.not-found-container {
  background-color: #f8fafc;
  min-height: 100vh;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.gap-4 {
  gap: 1rem;
}
</style>
