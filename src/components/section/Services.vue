<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { tokens } from '../../locales/tokens'
import { Motion } from 'motion-v'
import SectionTitle from '../SectionTitle.vue'

const { t } = useI18n()

const services = ref([
  {
    icon: '🏗️',
    titleToken: tokens.services.turnkey.title,
    descToken: tokens.services.turnkey.desc,
    moreToken: tokens.services.turnkey.more,
    hasMore: true
  },
  {
    icon: '📐',
    titleToken: tokens.services.empreitada.title,
    descToken: tokens.services.empreitada.desc,
    moreToken: tokens.services.empreitada.more,
    hasMore: true
  },
  {
    icon: '🏢',
    titleToken: tokens.services.built.title,
    descToken: tokens.services.built.desc,
    moreToken: tokens.services.built.more,
    hasMore: true
  }
])
</script>

<template>
  <v-container fluid class="pa-0 my-12">
    <v-container>
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true, amount: 0.3 }"
      >
        <SectionTitle :title="t(tokens.services.title)" />
      </Motion>
      
      <v-row class="mt-6" justify="center">
        <v-col 
          v-for="(service, index) in services" 
          :key="service.titleToken"
          cols="12" sm="6" md="4"
          class="d-flex align-center justify-center mb-4"
        >
          <Motion
            :initial="{ opacity: 0, y: 50 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: index * 0.2 }"
            :viewport="{ once: true, amount: 0.3 }"
            class="service-card"
          >
            <v-card 
              class="service-card h-100 d-flex flex-column"
              variant="elevated"
              elevation="2"
              height="100%"
            >
              <v-card-item>
                <div class="service-icon mb-4">{{ service.icon }}</div>
                <v-card-title>{{ t(service.titleToken) }}</v-card-title>
                <v-card-text>
                  <p>{{ t(service.descToken) }}</p>
                </v-card-text>
              </v-card-item>
              
              <v-card-actions v-if="service.hasMore" class="mt-auto">
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary"
                  variant="text"
                  :ripple="false"
                  class="px-2"
                >
                  {{ t(service.moreToken) }} 
                  <v-icon icon="mdi-chevron-right" size="small"></v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </Motion>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.service-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.service-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1) !important;
}

@media (max-width: 600px) {
  .service-icon {
    font-size: 2rem;
  }
}
</style>
