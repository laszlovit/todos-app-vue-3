<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { findAll } from '../lib/API'
import type { TodoWithId } from '@/types/types'
import ProgressBar from 'primevue/progressbar'
import TodoForm from '@/components/TodoForm.vue'

async function fetchTodoList() {
  return await findAll()
}

const { isFetching, isError, data, error } = useQuery<TodoWithId[]>({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
  select: (todos) => todos.slice().reverse()
})
</script>

<template>
  <div class="mx-auto max-w-xl py-6 px-6 lg:px-8">
    <div class=""><TodoForm /></div>
    <div
      :style="{ opacity: isFetching ? '1' : '0' }"
      class="flex justify-center mt-6 h-1.5 mb-4 duration-500"
    >
      <ProgressBar class="w-full h-1.5" mode="indeterminate"></ProgressBar>
    </div>
    <div class="flex flex-col gap-y-4">
      <div class="rounded-xl border bg-white shadow p-4" v-for="todo in data" :key="todo._id">
        <p class="">{{ todo.content }}</p>
      </div>
    </div>
  </div>
</template>
