<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FlagPTBR from '@/assets/flags/flag-pt-br.png'
import FlagUK from '@/assets/flags/flag-uk.png'

const { locale } = useI18n()

const languages = [
  {
    code: 'ptBR',
    label: 'Português (Brasil)',
    icon: FlagPTBR
  },
  {
    code: 'en',
    label: 'English',
    icon: FlagUK
  }
]

const showOptions = ref(false)

function toggleOptions() {
  showOptions.value = !showOptions.value
}

function changeLanguage(code: string) {
  locale.value = code
  showOptions.value = false
}
</script>

<template>
  <div class="language-switch">
    <button class="lang-btn" @click="toggleOptions">
      <img
        :src="languages.find(l => l.code === locale)?.icon"
        :alt="languages.find(l => l.code === locale)?.label"
        width="28"
        height="20"
      />
    </button>
    <ul v-if="showOptions" class="lang-list">
      <li
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="{ active: locale === lang.code }"
      >
        <img :src="lang.icon" :alt="lang.label" width="28" height="20" />
        <span>{{ lang.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.language-switch {
  position: relative;
  display: inline-block;
}
.lang-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.lang-list {
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  list-style: none;
  margin: 0;
  padding: 0.3rem 0;
  min-width: 160px;
  z-index: 10;
}
.lang-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  transition: background 0.15s;
}
.lang-list li.active,
.lang-list li:hover {
  background: #f0f4f8;
}
</style>
