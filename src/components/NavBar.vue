<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
</script>

<template>
  <div class="card">
    <Toolbar>
      <template #start
        ><router-link :to="{ name: 'home' }"
          ><p class="font-semibold text-3xl">Vue Todo App</p></router-link
        ></template
      >
    </Toolbar>
  </div>
</template>
