<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <Header />
  <v-main>
    <router-view />
  </v-main>
  <Footer />
</template>
