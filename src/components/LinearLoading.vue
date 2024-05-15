<script setup lang="ts">
import ProgressBar from 'primevue/progressbar'

const props = defineProps<{ isLoading: boolean }>()
</script>

<template>
  <div
    :style="{ opacity: props.isLoading ? '1' : '0' }"
    class="flex justify-center mt-6 h-1.5 mb-4 duration-500"
  >
    <ProgressBar class="w-full h-1.5" mode="indeterminate"></ProgressBar>
  </div>
</template>
