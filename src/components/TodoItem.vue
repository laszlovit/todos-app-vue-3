<script setup lang="ts">
import type { TodoWithId } from '@/types/types'
import Card from 'primevue/card'

const props = defineProps<{ todo: TodoWithId }>()
</script>

<template>
  <Card class="rounded-xl border bg-white shadow p-4" :key="props.todo._id.toString()">
    <template #title
      ><p>{{ props.todo.done ? '✅' : '' }} {{ props.todo.content }}</p></template
    >
    <template #content>
      <slot />
    </template>
  </Card>
</template>
