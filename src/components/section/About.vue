<script setup lang="ts">
import { tokens } from '../../locales/tokens'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import SectionTitle from '../SectionTitle.vue'

const { t } = useI18n()
</script>

<template>
  <v-container fluid class="pa-0 my-12">
    <v-sheet color="background-section" class="about-section rounded-lg">
      <v-container>
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          :viewport="{ once: true, amount: 0.5 }"
        >
          <SectionTitle :title="t(tokens.about.title)" />
        </Motion>
        
        <Motion
          :initial="{ opacity: 0, scale: 0.98 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.5, delay: 0.2 }"
          :viewport="{ once: true, amount: 0.5 }"
        >
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <v-card variant="text" class="about-text px-4">
                <v-card-text>
                  <p v-for="(line, idx) in t(tokens.about.text).split('\n')" :key="idx">
                    {{ line }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </Motion>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.about-section {
  max-width: 900px;
  margin: 0 auto;
}

.about-text {
  line-height: 1.7;
  color: var(--subtitle-color);
}

@media (min-width: 960px) {
  .about-section {
    padding: 2.5rem;
  }
}
</style>
