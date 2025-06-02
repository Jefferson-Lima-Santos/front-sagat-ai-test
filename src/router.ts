import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('./views/HomeView.vue')
const RegisterView = () => import('./views/RegisterView.vue')
const LoginView = () => import('./views/LoginView.vue')
const AdminView = () => import('./views/AdminView.vue')
const StatementView = () => import('./views/StatementView.vue')
const NotFoundView = () => import('./views/NotFoundView.vue')
const AdminLayout = () => import('./layouts/AdminLayout.vue')
const DefaultLayout = () => import('./layouts/DefaultLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin',
          component: AdminView
        },
        {
          path: 'statements',
          name: 'statements',
          component: StatementView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router