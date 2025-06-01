<script setup lang="ts">
import { tokens } from '../../locales/tokens'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'

const { t } = useI18n()
</script>

<template>
  <v-container fluid class="pa-0">
    <v-sheet color="background-light" class="hero-section py-10 py-md-16 rounded-lg">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <Motion 
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.7 }"
            >
              <h1 class="hero-title text-h2 font-weight-bold mb-6">
                <span v-for="(line, idx) in t(tokens.hero.title).split('\n')" :key="line">
                  <Motion 
                    :initial="{ opacity: 0, x: -20 }"
                    :animate="{ opacity: 1, x: 0 }"
                    :transition="{ duration: 0.5, delay: idx * 0.15 }"
                  >
                    {{ line }}
                  </Motion>
                  <br v-if="idx < t(tokens.hero.title).split('\n').length - 1" />
                </span>
              </h1>
            </Motion>
            
            <Motion
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ duration: 0.8, delay: 0.4 }"
            >
              <v-sheet color="transparent" class="hero-subtitle-container">
                <p class="subtitle text-subtitle-1 text-medium-emphasis">
                  <span v-for="(line, idx) in t(tokens.hero.subtitle).split('\n')" :key="idx">
                    {{ line }}<br v-if="idx < t(tokens.hero.subtitle).split('\n').length - 1" />
                  </span>
                </p>
              </v-sheet>
            </Motion>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.hero-section {
  box-shadow: var(--box-shadow);
  margin: 2.5rem auto 2rem auto;
  max-width: 900px;
}

.hero-title {
  background: linear-gradient(90deg, var(--text-color), #42b983);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

.subtitle {
  font-weight: 400;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.75rem !important;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}

@media (min-width: 960px) {
  .hero-section {
    padding: 3.5rem 3rem;
  }
}
</style>
