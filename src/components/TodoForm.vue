<script setup lang="ts">
import { ref } from 'vue'
import { useQueryClient, useMutation, type InvalidateQueryFilters } from '@tanstack/vue-query'
import { createOne } from '@/lib/API'
import type { Todo } from '@/types/types'
import { useCurrentUser } from 'vuefire'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const user = useCurrentUser()

const addModalIsVisible = ref(false)

const newTodo = ref('')

const queryClient = useQueryClient()

// Define the mutation for creating a new todo
const { isPending, isError, error, mutate } = useMutation({
  mutationFn: async (newTodoData: Todo) => {
    const createdTodo = await createOne(newTodoData)
    // Invalidate the query for fetching all todos after successful mutation
    queryClient.invalidateQueries({ queryKey: ['todos'] } as InvalidateQueryFilters)
    return createdTodo
  }
})

// Define a function to handle form submission
const formSubmitted = () => {
  if (newTodo.value.trim()) {
    mutate({
      content: newTodo.value,
      done: false
    })
    newTodo.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="user?.email && formSubmitted()">
    <div class="flex flex-col gap-3 mb-6">
      <label for="content" class="font-semibold">New Todo</label>
      <InputText
        v-model="newTodo"
        id="content"
        :disabled="isPending"
        class="flex-auto"
        autocomplete="off"
      />
      <span v-if="isError" class="text-red-500">{{ error }}</span>
    </div>
    <div class="flex justify-end gap-2">
      <Button
        v-if="user?.email"
        type="submit"
        :disabled="!newTodo"
        :loading="isPending"
        label="Add Todo"
      />
      <Button v-else :disabled="!newTodo" label="Add Todo" @click="addModalIsVisible = true" />
      <Dialog
        v-model:visible="addModalIsVisible"
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
            @click="addModalIsVisible = false"
          ></Button>
          <RouterLink :to="{ name: 'signIn' }">
            <Button
              type="button"
              severity="info"
              label="To Login Page"
              @click="addModalIsVisible = false"
            />
          </RouterLink>
        </div>
      </Dialog>
    </div>
  </form>
</template>
