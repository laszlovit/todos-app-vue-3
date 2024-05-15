<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { findAll } from '../lib/API'
import type { TodoWithId } from '@/types/types'
import Button from 'primevue/button'
import TodoForm from '@/components/TodoForm.vue'
import TodoItem from '@/components/TodoItem.vue'
import LinearLoading from '@/components/LinearLoading.vue'
import MainLayout from '@/layouts/MainLayout.vue'

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
  <main-layout>
    <slot>
      <todo-form />
      <linear-loading :is-loading="isFetching" />
      <div v-if="data" class="flex flex-col gap-y-4">
        <todo-item v-for="todo in data" :key="todo._id.toString()" :todo="todo">
          <slot>
            <div class="flex justify-end">
              <Button size="small">
                <router-link :to="{ name: 'todo', params: { id: todo._id.toString() } }">
                  Edit
                </router-link>
              </Button>
            </div>
          </slot>
        </todo-item>
      </div>
    </slot>
  </main-layout>
</template>
