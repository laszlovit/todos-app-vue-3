<script setup lang="ts">
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'

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
const signInSuccess = ref(false)

async function createUser() {
  createUserWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      signUpSuccess.value = true
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
}

async function signInToFirebase() {
  signInWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      signInSuccess.value = true
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}
</script>

<template>
  <main-layout
    ><h1 class="mb-4 font-semibold">Log in / Create new user</h1>
    <Message v-if="signUpSuccess" severity="success"
      >User created successfully.
      <span class="underline underline-offset-2"
        ><router-link :to="{ name: 'home' }">Proceed to the home page. </router-link></span
      >
    </Message>
    <Message v-if="signInSuccess" severity="success"
      >Log in successful.
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
          outlined
        />
        <Button
          label="Create new user"
          class="uppercase"
          size="small"
          severity="info"
          @click="createUser"
        />
      </div>
    </form>
  </main-layout>
</template>
