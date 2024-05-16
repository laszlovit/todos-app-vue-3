<script setup lang="ts">
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from '@firebase/auth'

import MainLayout from '@/layouts/MainLayout.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'

const userInput = ref({
  email: '',
  password: ''
})

const auth = useFirebaseAuth()!
const signInSuccess = ref(false)

async function signInToFirebase() {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userInput.value.email,
      userInput.value.password
    )
    const idToken = await userCredential.user.getIdToken(/* forceRefresh */ true)
    localStorage.setItem('token', idToken) // Store token in local storage
    console.log(idToken)
    signInSuccess.value = true // Set sign-in success flag
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    // Handle sign-in errors
    console.error('Sign-in failed:', errorMessage)
  }
}
</script>

<template>
  <main-layout
    ><h1 class="mb-4 font-semibold">Log in</h1>
    <Message v-if="signInSuccess" severity="success"
      >Log in was successful.
      <span class="underline underline-offset-2"
        ><router-link :to="{ name: 'home' }">Proceed to the home page. </router-link></span
      >
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
          label="Log in"
          @click="signInToFirebase"
          class="uppercase"
          size="small"
          severity="info"
        />
        <router-link :to="{ name: 'signUp' }">
          <Button label="Sign up" class="uppercase" size="small" severity="info" outlined />
        </router-link>
      </div>
    </form>
  </main-layout>
</template>
