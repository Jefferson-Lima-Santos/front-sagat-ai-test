<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import TimelineSection from './components/section/Timeline.vue'
import ServicesSection from './components/section/Services.vue'
import HeroSection from './components/section/Hero.vue'
import AboutSection from './components/section/About.vue'
import { tokens } from './locales/tokens'
import { useI18n } from 'vue-i18n'
import { onMounted, computed } from 'vue'

const { t, locale } = useI18n()

type TimelinePhase = keyof typeof tokens.timeline.items

const timelinePhases: TimelinePhase[] = [
  'engineering',
  'resources',
  'realEstate',
  'sales',
  'systems'
]

const sortedTimelinePhases = computed(() => {
  return [...timelinePhases].sort((a, b) => {
    const yearA = Number(t(tokens.timeline.items[a].year))
    const yearB = Number(t(tokens.timeline.items[b].year))
    return yearA - yearB
  })
})

</script>

<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #42b983;
  --text-color: #333;
  --subtitle-color: #555;
  --background-light: #f8fafc;
  --background-section: #f0f4f8;
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

body {
  background-color: #fff;
  color: var(--text-color);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.25;
}

section {
  padding: 2rem 1rem;
}

p {
  margin: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>

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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero .subtitle {
  font-size: 1.25rem;
  color: var(--subtitle-color);
  font-weight: 400;
}

.sobre {
  margin: 3rem auto;
  padding: 2rem 2rem;
  background: var(--background-section);
  border-radius: var(--border-radius);
  max-width: 900px;
}

@media (min-width: 1024px) {
  .hero {
    padding: 3.5rem 3rem;
  }
  
  .sobre {
    padding: 2.5rem;
  }
}
</style>
