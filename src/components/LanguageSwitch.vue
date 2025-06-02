<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FlagPTBR from '@/assets/flags/flag-pt-br.png'
import FlagUK from '@/assets/flags/flag-uk.png'

const { locale } = useI18n()
const menu = ref(false)

const languages = [
  {
    code: 'ptBR',
    label: 'Português (Brasil)',
    flag: FlagPTBR
  },
  {
    code: 'en',
    label: 'English',
    flag: FlagUK
  }
]

function switchLanguage(code: string) {
  locale.value = code
  menu.value = false
}

const getCurrentFlag = () => {
  const current = languages.find(lang => lang.code === locale.value)
  return current ? current.flag : languages[0].flag
}
</script>

<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="true" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          variant="text"
          class="language-btn"
        >
          <img :src="getCurrentFlag()" width="24" height="24" />
        </v-btn>
      </template>
      
      <v-card min-width="200">
        <v-list>
          <v-list-item
            v-for="(lang, i) in languages"
            :key="i"
            :value="lang.code"
            @click="switchLanguage(lang.code)"
            :active="locale === lang.code"
          >
            <template v-slot:prepend>
              <v-img :src="lang.flag" width="24" height="16" class="mr-2" />
            </template>
            <v-list-item-title>{{ lang.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
.language-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
