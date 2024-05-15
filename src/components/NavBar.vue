<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'

import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { signOut } from '@firebase/auth'

const user = useCurrentUser()

const auth = useFirebaseAuth()

async function signOutOfFirebase() {
  signOut(auth!).catch((error) => {
    console.error(error)
  })
}
</script>

<template>
  <div class="card">
    <Toolbar>
      <template #start
        ><router-link :to="{ name: 'home' }"
          ><p class="font-semibold text-3xl">Vue Todo App</p></router-link
        ></template
      >
      <template #end
        ><router-link v-if="user?.email" :to="{ name: 'signIn' }"
          ><Button label="Log out" @click="signOutOfFirebase" severity="info" /></router-link
        ><router-link v-else :to="{ name: 'signIn' }"
          ><Button label="Log in" severity="info" /></router-link
      ></template>
    </Toolbar>
  </div>
</template>
