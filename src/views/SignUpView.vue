<script setup lang="ts">
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword } from '@firebase/auth'

import MainLayout from '@/layouts/MainLayout.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'

const userInput = ref({
  email: '',
  password: ''
})

const auth = useFirebaseAuth()!
const signUpSuccess = ref(false)
const errorMessage = ref('') // Ref to store error message

async function createUser() {
  try {
    await createUserWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
    // Signed up successfully
    signUpSuccess.value = true
    // ...
  } catch (error: any) {
    const errorCode = error.code
    let errorMessageText = ''
    // Handle specific error codes
    switch (errorCode) {
      case 'auth/invalid-email':
        errorMessageText = 'Invalid email address.'
        break
      case 'auth/email-already-in-use':
        errorMessageText = 'Email is already in use.'
        break
      case 'auth/weak-password':
        errorMessageText = 'Password is too weak.'
        break
      default:
        errorMessageText = 'Sign-up failed. Please try again later.'
        break
    }
    // Set the error message
    errorMessage.value = errorMessageText
  }
}
</script>

<template>
  <MainLayout>
    <h1 class="mb-4 font-semibold">Sign up</h1>
    <!-- Display error message only if errorMessage exists -->
    <Message v-if="errorMessage" severity="error">
      {{ errorMessage }}
    </Message>
    <!-- Display success message if sign-up was successful -->
    <Message v-if="signUpSuccess" severity="success">
      User created successfully.
      <span class="underline underline-offset-2">
        <router-link :to="{ name: 'home' }">Proceed to the home page.</router-link>
      </span>
    </Message>
    <form action="" class="flex flex-col gap-y-4">
      <InputText
        v-model="userInput.email"
        type="email"
        id="email"
        placeholder="Email"
        class="flex-auto"
        autocomplete="off"
      />
      <InputText
        v-model="userInput.password"
        type="password"
        id="password"
        placeholder="Password"
        class="flex-auto"
        autocomplete="off"
      />
      <div class="flex gap-x-2">
        <Button
          label="Sign up"
          class="uppercase"
          size="small"
          severity="info"
          @click="createUser"
        />
        <router-link :to="{ name: 'signIn' }">
          <Button label="Log in" class="uppercase" size="small" severity="info" outlined />
        </router-link>
      </div>
    </form>
  </MainLayout>
</template>
