import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('./views/HomeView.vue')
const RegisterView = () => import('./views/RegisterView.vue')
const AdminView = () => import('./views/AdminView.vue')
const AdminLayout = () => import('./layouts/AdminLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin',
          component: AdminView
        }
      ]
    }
  ]
})

export default router