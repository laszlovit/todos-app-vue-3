<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { findAll } from '../lib/API'
import type { TodoWithId } from '@/types/types'
import { useCurrentUser } from 'vuefire'
import Button from 'primevue/button'
import TodoForm from '@/components/TodoForm.vue'
import TodoItem from '@/components/TodoItem.vue'
import LinearLoading from '@/components/LinearLoading.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'

const user = useCurrentUser()

const editModalIsVisible = ref(false)

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
  <MainLayout>
    <slot>
      <TodoForm />
      <LinearLoading :is-loading="isFetching" />
      <Message v-if="isError" severity="error">Error: {{ error?.message }}</Message>
      <div v-if="data" class="flex flex-col gap-y-4">
        <TodoItem v-for="todo in data" :key="todo._id.toString()" :todo="todo">
          <slot>
            <div class="flex justify-end">
              <RouterLink
                v-if="user?.email"
                :to="{ name: 'todo', params: { id: todo._id.toString() } }"
              >
                <Button label="Edit" size="small" />
              </RouterLink>
              <Button v-else label="Edit" @click="editModalIsVisible = true" size="small" />
            </div>
          </slot>
        </TodoItem>
      </div>
      <Dialog
        v-model:visible="editModalIsVisible"
        modal
        header="Login required"
        :style="{ width: '25rem' }"
      >
        <span class="text-surface-600 dark:text-surface-0/70 block mb-5"
          >You have to log in to edit todos.</span
        >
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="editModalIsVisible = false"
          ></Button>
          <RouterLink :to="{ name: 'signIn' }">
            <Button
              type="button"
              severity="info"
              label="To Login Page"
              @click="editModalIsVisible = false"
            />
          </RouterLink>
        </div>
      </Dialog>
    </slot>
  </MainLayout>
</template>
