<script setup lang="ts">
import { tokens } from '../../locales/tokens'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import SectionTitle from '../SectionTitle.vue'

const { t } = useI18n()
</script>

<template>
  <section class="sobre">
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
      <p class="about-text">
        <span v-for="(line, idx) in t(tokens.about.text).split('\n')" :key="idx">
          {{ line }}<br />
        </span>
      </p>
    </Motion>
  </section>
</template>

<style scoped>
.sobre {
  margin: 3rem auto;
  padding: 2rem 2rem;
  background: var(--background-section);
  border-radius: var(--border-radius);
  max-width: 900px;
}

.about-text {
  line-height: 1.7;
  color: var(--subtitle-color);
}

@media (min-width: 1024px) {
  .sobre {
    padding: 2.5rem;
  }
}
</style>
