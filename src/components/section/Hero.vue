<script setup lang="ts">
import { tokens } from '../../locales/tokens'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'

const { t } = useI18n()
</script>

<template>
  <section class="hero">
    <Motion 
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.7 }"
    >
      <h1>
        <span v-for="(line, idx) in t(tokens.hero.title).split('\n')" :key="line" class="title-line">
          <Motion 
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, delay: idx * 0.15 }"
          >
            {{ line }}
          </Motion>
          <br />
        </span>
      </h1>
    </Motion>
    
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.8, delay: 0.4 }"
    >
      <p class="subtitle">
        <span v-for="line in t(tokens.hero.subtitle).split('\n')" :key="line">
          {{ line }}<br />
        </span>
      </p>
    </Motion>
  </section>
</template>

<style scoped>
.hero {
  text-align: left;
  margin: 2.5rem auto 2rem auto;
  max-width: 900px;
  padding: 2.5rem 1.5rem;
  background: var(--background-light);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.hero h1 {
  font-size: 2.7rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  background: linear-gradient(90deg, var(--text-color), #42b983);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-line {
  display: inline-block;
}

.hero .subtitle {
  font-size: 1.25rem;
  color: var(--subtitle-color);
  font-weight: 400;
}

@media (min-width: 1024px) {
  .hero {
    padding: 3.5rem 3rem;
  }
}
</style>
