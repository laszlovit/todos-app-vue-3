<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <nav-bar />
  <main class="">
    <RouterView />
  </main>
</template>

<style scoped></style>
