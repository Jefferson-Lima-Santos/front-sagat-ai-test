<script setup lang="ts">
import { tokens } from '../../locales/tokens'
import { useI18n } from 'vue-i18n'
import { Motion } from 'motion-v'
import { ref } from 'vue'
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
  <section class="servicos">
    <Motion
      :initial="{ opacity: 0, y: 30 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8 }"
    >
      <SectionTitle :title="t(tokens.services.title)" />
    </Motion>
    
    <div class="servicos-lista">
      <Motion 
        v-for="(service, idx) in services" 
        :key="idx"
        as="div"
        class="servico"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: idx * 0.2 }"
        :viewport="{ once: true, amount: 0.3 }"
      >
        <div class="icon-wrapper">
          <div class="icon">{{ service.icon }}</div>
        </div>
        <h3>{{ t(service.titleToken) }}</h3>
        <p>
          {{ t(service.descToken) }}
        </p>
        <a v-if="service.hasMore" href="#" class="more-link">
          {{ t(service.moreToken) }}
        </a>
      </Motion>
    </div>
  </section>
</template>

<style scoped>
.servicos {
  margin: 3rem auto;
  max-width: 1100px;
  padding: 0 1.5rem;
}

.servicos-lista {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
}

.servico {
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  flex: 1 1 280px;
  min-width: 280px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease;
  border: 1px solid rgba(230,230,230,0.7);
  position: relative;
  overflow: hidden;
}

.servico::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background-color: var(--primary-color);
  transition: height 0.4s ease;
}

.servico:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(66,185,131,0.15);
}

.servico:hover::before {
  height: 100%;
}

.icon-wrapper {
  background-color: rgba(66, 185, 131, 0.1);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  transition: all 0.3s ease;
}

.servico:hover .icon-wrapper {
  transform: scale(1.1);
  background-color: rgba(66, 185, 131, 0.2);
}

.servico .icon {
  font-size: 2.4rem;
}

.servico h3 {
  margin: 0.75rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
}

.servico p {
  margin: 0.5rem 0;
  color: var(--subtitle-color);
  line-height: 1.6;
  flex-grow: 1;
}

.more-link {
  margin-top: 1.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  position: relative;
  padding-bottom: 2px;
  align-self: flex-start;
}

.more-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.more-link:hover::after {
  width: 100%;
}

@media (max-width: 768px) {
  .servicos {
    padding: 0 1rem;
  }
  
  .servicos-lista {
    gap: 1.5rem;
  }
  
  .servico {
    min-width: 100%;
  }
}
</style>
