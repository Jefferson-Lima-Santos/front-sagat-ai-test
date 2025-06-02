<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { tokens } from '../locales/tokens'

const { t } = useI18n()
const currentYear = new Date().getFullYear()

type FooterCompanyKey = 'about' | 'services' | 'projects' | 'careers'
const companyItems: FooterCompanyKey[] = ['about', 'services', 'projects', 'careers']

type FooterResourceKey = 'blog' | 'documentation' | 'faq'
const resourceItems: FooterResourceKey[] = ['blog', 'documentation', 'faq']
</script>

<template>
  <v-footer class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" md="3" class="d-flex align-center">
          <div class="d-flex flex-column align-start">
            <div class="mb-4">
              <div class="mb-4">
                <img src="../assets/sagat-icon.png" alt="Sagat logo" height="50" />
              </div>
              <p class="text-h6 font-weight-bold mt-2">SAGAT AI</p>
            </div>
          </div>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">
            <v-divider class="custom-divider mb-3" width="30"></v-divider>
            <v-list-item v-for="item in companyItems" :key="item">
              <v-list-item-title>
                <a href="#" class="text-subtitle-2 text-medium-emphasis text-decoration-none">
                  {{ t(tokens.footer[item]) }}
                </a>
              </v-list-item-title>
            </v-list-item>
          </h3>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">
            <v-list density="compact" bg-color="transparent" class="pa-0">
              <v-list-item v-for="item in resourceItems" :key="item">
                <v-list-item-title>
                  <a href="#" class="text-subtitle-2 text-medium-emphasis text-decoration-none">
                    {{ t(tokens.footer[item]) }}
                  </a>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </h3>
        </v-col>

        <v-col cols="12" md="3">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">
            <v-divider class="custom-divider mb-3" width="30"></v-divider>
            {{ t(tokens.footer.contact) }}
          </h3>
          <v-list density="compact" bg-color="transparent" class="pa-0">
            <v-list-item prepend-icon="mdi-map-marker-outline">
              <v-list-item-title class="text-subtitle-2 text-medium-emphasis">
                <div>R. Vítor Janjacomo, 862 - Parque Industrial</div>
                <div>Penápolis, SP - 16300-000</div>
              </v-list-item-title>
            </v-list-item>

            <v-list-item prepend-icon="mdi-phone-outline">
              <v-list-item-title class="text-subtitle-2 text-medium-emphasis">
                <a href="tel:+551836522228" class="text-decoration-none">+55 (18) 3652-2228</a>
              </v-list-item-title>
            </v-list-item>

            <v-list-item prepend-icon="mdi-email-outline">
              <v-list-item-title class="text-subtitle-2 text-medium-emphasis">
                <a href="mailto:comercial@sagatengenharia.com.br"
                  class="text-decoration-none">comercial@sagatengenharia.com.br</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row>
        <v-col cols="12" sm="6">
          <p class="text-body-2 text-medium-emphasis">&copy; {{ currentYear }} SAGAT AI. {{
            t(tokens.footer.allRightsReserved) }}</p>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex justify-end">
          <v-btn v-for="(link, i) in [
            { icon: 'mdi-linkedin', url: 'https://www.linkedin.com/company/sagat-engenharia/' },
            { icon: 'mdi-facebook', url: 'https://www.facebook.com/sagatengenharia' },
            { icon: 'mdi-instagram', url: 'https://www.instagram.com/sagatengenharia/' },
            { icon: 'mdi-youtube', url: 'https://www.youtube.com/@sagatengenharia4007' }
          ]" :key="i" :href="link.url" target="_blank" variant="text" icon size="small" color="grey-darken-1"
            class="mx-1">
            <v-icon>{{ link.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.custom-divider {
  border-color: var(--primary-color) !important;
  opacity: 1;
}
</style>
