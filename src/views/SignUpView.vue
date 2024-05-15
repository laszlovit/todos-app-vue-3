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

async function createUser() {
  createUserWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      signUpSuccess.value = true
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
}
</script>

<template>
  <main-layout
    ><h1 class="mb-4 font-semibold">Sign up</h1>
    <Message v-if="signUpSuccess" severity="success"
      >User created successfully.
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
  </main-layout>
</template>
