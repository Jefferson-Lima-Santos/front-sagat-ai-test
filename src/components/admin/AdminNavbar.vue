<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { tokens } from '../../locales/tokens';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import FlagPTBR from '@/assets/flags/flag-pt-br.png'
import FlagUK from '@/assets/flags/flag-uk.png'


const { t, locale } = useI18n();
const authStore = useAuthStore();
const router = useRouter();
const { smAndDown } = useDisplay();

const drawer = ref(!smAndDown.value);
const rail = ref(false);
const languageMenu = ref(false);

const drawerToggleIcon = computed(() => {
  return drawer.value ? 'mdi-menu-open' : 'mdi-menu';
});


const emit = defineEmits(['update:drawer']);


watch(drawer, (newValue) => {
  emit('update:drawer', newValue);
});

watch(smAndDown, (newValue) => {
  if (!newValue) {
    drawer.value = false;
  }
});

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const navigationItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/admin' },
];

const languages = [
  { code: 'ptBR', label: 'Português (Brasil)', icon: FlagPTBR },
  { code: 'en', label: 'English', icon: FlagUK },
];

const changeLanguage = (langCode: string) => {
  locale.value = langCode;
  languageMenu.value = false;
};

const getCurrentLanguage = () => {
  return languages.find(lang => lang.code === locale.value) || languages[0];
};
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="smAndDown"
    :permanent="!smAndDown"
    :rail="rail && !smAndDown"
    @click="rail ? rail = false : null"
    width="255"
  >
    <v-list-item
      :prepend-icon="rail ? 'mdi-menu' : undefined"
      :title="rail ? undefined : 'SAGAT Admin'"
      nav
    >
      <template v-slot:prepend>
        <v-img
          v-if="!rail"
          src="../../assets/sagat-icon.png"
          max-width="40"
          class="mr-3"
        ></v-img>
      </template>
      <template v-slot:append>
        <v-btn
          v-if="!smAndDown"
          variant="text"
          :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          @click.stop="rail = !rail"
        ></v-btn>
        <v-btn
          v-else
          variant="text"
          icon="mdi-close"
          @click.stop="drawer = false"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item v-if="!rail">
      <template v-slot:prepend>
        <v-avatar size="24">
          <v-img :src="getCurrentLanguage().icon" alt="Language" />
        </v-avatar>
      </template>
      <v-list-item-title>{{ getCurrentLanguage().label }}</v-list-item-title>
      <template v-slot:append>
        <v-menu
          v-model="languageMenu"
          location="end"
          :close-on-content-click="true"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-chevron-down"
              variant="text"
              size="small"
              v-bind="props"
            ></v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(lang, i) in languages"
              :key="i"
              @click="changeLanguage(lang.code)"
            >
              <template v-slot:prepend>
                <v-avatar size="24">
                  <v-img :src="lang.icon" alt="Language flag" />
                </v-avatar>
              </template>
              <v-list-item-title>{{ lang.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-list-item>

    <v-divider v-if="!rail"></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in navigationItems"
        :key="i"
        :value="item"
        :to="item.to"
        color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
    
    <template v-slot:append>
      <div class="pa-2 d-flex justify-center" v-if="rail">
        <v-menu v-model="languageMenu" location="end">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind="props"
              size="small"
            >
              <v-avatar size="24">
                <v-img :src="getCurrentLanguage().icon" alt="Language" />
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(lang, i) in languages"
              :key="i"
              @click="changeLanguage(lang.code)"
            >
              <template v-slot:prepend>
                <v-avatar size="24">
                  <v-img :src="lang.icon" alt="Language flag" />
                </v-avatar>
              </template>
              <v-list-item-title>{{ lang.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      
      <v-divider></v-divider>
      <v-list v-if="rail">
        <v-list-item @click="handleLogout" color="error">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout" size="small"></v-icon>
          </template>
          <v-list-item-title>{{ t(tokens.admin.logout) }}</v-list-item-title>
        </v-list-item>
      </v-list>
      
      
      <v-list v-if="!rail">
        <v-list-item >
          <template v-slot:prepend>
            <v-avatar size="40" color="primary">
              <span class="text-h6 text-white">
                {{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : 'U' }}
              </span>
            </v-avatar>
          </template>
          <v-list-item-title class="font-weight-bold">
            {{ authStore.user?.name || 'User' }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ authStore.user?.email || 'email@example.com' }}
          </v-list-item-subtitle>
        </v-list-item>
        
        <v-list density="compact">
          
          <v-list-item @click="handleLogout" color="error">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout" size="small"></v-icon>
            </template>
            <v-list-item-title>{{ t(tokens.admin.logout) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-list>
    </template>
  </v-navigation-drawer>

  <v-btn
    v-if="smAndDown && !drawer"
    :icon="drawerToggleIcon"
    color="primary"
    class="drawer-toggle-btn"
    @click="toggleDrawer"
    position="fixed"
    location="top left"
    style="margin: 8px; z-index: 1000;"
  ></v-btn>
  
</template>

<style scoped>
.drawer-toggle-btn {
  z-index: 1000;
}
</style>
