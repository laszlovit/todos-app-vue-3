<script setup lang="ts">
import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { createOne } from '@/lib/API'
import { Todo } from '../types/TodoWithId'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { ref } from 'vue'

const newTodo = ref('')

const queryClient = useQueryClient()

// Define the mutation for creating a new todo
const { isPending, isError, error, isSuccess, mutate } = useMutation({
  mutationFn: async (newTodoData: Todo) => {
    // Call the API to create a new todo
    const createdTodo = await createOne(newTodoData)
    // Invalidate the query for fetching all todos after successful mutation
    queryClient.invalidateQueries('findAll')
    // Return the created todo
    return createdTodo
  }
})

// Define a function to handle form submission
const formSubmitted = () => {
  if (newTodo.value.trim()) {
    // Call the mutate function to create a new todo
    mutate({
      content: newTodo.value,
      done: false
    })
    // Reset the newTodo value after submission
    newTodo.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="formSubmitted">
    <div class="flex flex-col gap-3 mb-6">
      <label for="content" class="font-semibold">New Todo</label>
      <InputText
        v-model="newTodo"
        id="content"
        :disabled="isPending"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="submit"
        :disabled="!newTodo"
        :loading="isPending"
        label="Add Todo"
        @click="load"
      ></Button>
    </div>
  </form>
</template>
