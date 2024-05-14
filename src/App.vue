<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toolbar from 'primevue/toolbar'
</script>

<template>
  <div class="card">
    <Toolbar>
      <template #start> <p class="font-semibold text-3xl">Vue Todo App</p> </template>
    </Toolbar>
  </div>
  <main class="container mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
