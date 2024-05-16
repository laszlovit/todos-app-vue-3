import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import { useCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todos/edit/:id',
      name: 'todo',
      component: () => import('@/views/TodoView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignInView
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUpView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = useCurrentUser()
  if (to.matched.some((record) => record.meta.requiresAuth) && (!user.value || !user.value.email)) {
    next({ name: 'signIn' })
  } else {
    next()
  }
})

export default router
