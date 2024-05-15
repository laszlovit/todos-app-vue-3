import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
      component: () => import('@/views/TodoView.vue')
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('@/views/SignInView.vue')
    }
  ]
})

export default router
