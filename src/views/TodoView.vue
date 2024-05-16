<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { findOne, deleteOne, updateOne } from '@/lib/API'
import type { Todo, TodoWithId } from '@/types/types'
import LinearLoading from '@/components/LinearLoading.vue'
import TodoItem from '@/components/TodoItem.vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import MainLayout from '@/layouts/MainLayout.vue'

const queryClient = useQueryClient()
const route = useRoute()
const router = useRouter()
const id = route.params.id.toString()

async function fetchTodoById(id: string) {
  return await findOne(id)
}

const { isFetching, isError, data, error } = useQuery<TodoWithId>({
  queryKey: ['findOne', id],
  queryFn: () => fetchTodoById(id)
})

const updateOneMutation = useMutation<TodoWithId, Error, Todo>({
  mutationFn: async (todo) => {
    return await updateOne(id, todo)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['findOne', id] })
    queryClient.invalidateQueries({ queryKey: ['findAll'] })
  }
})

const { isPending: isDeleting, mutateAsync: deleteMutateAsync } = useMutation({
  mutationFn: deleteOne, // Use the deleteOne function as mutationFn
  onSuccess() {
    // Invalidate the 'findAll' query to refetch updated todo list
    queryClient.invalidateQueries({ queryKey: ['findAll'] })
    // Redirect to the home page after successful deletion
    router.push('/')
  }
})

// Function to delete a todo by id
function deleteTodo(id: string) {
  deleteMutateAsync(id)
}

const toggleDone = () => {
  if (!data.value) return
  const updatedTodo = {
    content: data.value.content,
    done: !data.value.done
  }
  updateOneMutation.mutate(updatedTodo)
}
</script>

<template>
  <MainLayout>
    <RouterLink :to="{ name: 'home' }">
      <Button label="Back to all todos" link class="px-0 py-0" />
    </RouterLink>
    <LinearLoading :is-loading="isFetching" />
    <Message v-if="isError">Error: {{ error?.message }}</Message>
    <TodoItem v-if="data" :todo="data">
      <slot>
        <div class="flex gap-x-2 justify-end">
          <Button label="Toggle Done" type="button" size="small" @click="toggleDone" />
          <Button
            type="button"
            label="Remove"
            severity="danger"
            size="small"
            @click="deleteTodo(id)"
            :loading="isDeleting"
          />
        </div> </slot
    ></TodoItem>
  </MainLayout>
</template>
