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
  <Toolbar>
    <template #start
      ><RouterLink :to="{ name: 'home' }"
        ><p class="font-semibold text-3xl">Vue Todo App</p></RouterLink
      ></template
    >
    <template #end
      ><RouterLink v-if="user?.email" :to="{ name: 'signIn' }"
        ><Button label="Log out" @click="signOutOfFirebase" severity="info" /></RouterLink
      ><RouterLink v-else :to="{ name: 'signIn' }"
        ><Button label="Log in" severity="info" /></RouterLink
    ></template>
  </Toolbar>
</template>
