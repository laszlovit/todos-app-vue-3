<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { findAll } from '../lib/API'
import { TodoWithId } from '../types/TodoWithId'
import ProgressSpinner from 'primevue/progressspinner'

import Card from 'primevue/card'

async function fetchTodoList() {
  return await findAll()
}

const { isPending, isError, data, error } = useQuery<TodoWithId[]>({
  queryKey: ['todos'],
  queryFn: fetchTodoList
})
</script>

<template>
  <ProgressSpinner v-if="isPending" />

  <span v-else-if="isError">Error: {{ error.message }}</span>

  <Card v-for="todo in data" :key="todo._id">
    <template #title>{{ todo.content }}</template>
    <template #content>{{ todo.done }}</template>
  </Card>
</template>
