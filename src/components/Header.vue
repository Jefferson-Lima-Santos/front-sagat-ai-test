<script setup lang="ts">
import LanguageSwitch from './LanguageSwitch.vue'
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { tokens } from '../locales/tokens'
import { useDisplay } from 'vuetify'

const { t, locale } = useI18n()
const { mdAndDown } = useDisplay()

const drawer = ref(false)
const isScrolled = ref(false)

watch(mdAndDown, (newValue) => {
  if (!newValue) {
    drawer.value = false
  }
})

const checkScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const getCurrentLanguage = () => {
  return locale.value === 'ptBR' ? 'Português' : 'English'
}

const getCurrentLanguageFlag = () => {
  return locale.value === 'ptBR' ? '/assets/flags/flag-pt-br.png' : '/assets/flags/flag-uk.png'
}
</script>

<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
    >
      <v-list-item class="mt-4">
        <v-list-item-title class="text-h6">SAGAT AI</v-list-item-title>
      </v-list-item>
      
      <v-divider class="my-2"></v-divider>
      
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-outline"
          title="Home"
          to="/"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-account-outline"
          :title="t(tokens.header.login)"
          to="/login"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-account-plus-outline"
          :title="t(tokens.header.signup)"
          to="/register"
        ></v-list-item>
      </v-list>
      
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <template v-slot:prepend>
              <v-avatar size="24" class="me-2">
                <v-img :src="getCurrentLanguageFlag()" alt="Language flag" />
              </v-avatar>
            </template>
            <v-list-item-title>{{ getCurrentLanguage() }}</v-list-item-title>
            <template v-slot:append>
              <LanguageSwitch />
            </template>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :elevation="isScrolled ? 1 : 0"
      color="white"
      class="px-4 py-2"
      height="70"
      :class="{ 'scrolled-header': isScrolled }"
    >
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <img
          alt="Sagat logo"
          class="mr-2"
          src="../assets/sagat-icon.png"
          height="40"
        />
      </router-link>

      <v-spacer></v-spacer>
      
      <div v-if="!mdAndDown" class="d-flex align-center">
        <v-btn
          variant="outlined"
          to="/login"
          class="mr-3"
          rounded="md"
          color="grey-darken-1"
          size="small"
        >
          {{ t(tokens.header.login) }}
        </v-btn>
        
        <v-btn
          variant="elevated"
          to="/register"
          class="mr-4"
          color="primary"
          rounded="md"
          size="small"
        >
          {{ t(tokens.header.signup) }}
        </v-btn>
        
        <LanguageSwitch />
      </div>
      
      <div v-else>
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<style scoped>
.scrolled-header {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9) !important;
}
</style>
