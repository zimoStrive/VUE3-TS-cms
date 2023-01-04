import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '../utils/cache'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/:patcMatch(.*)',
      component: () => import('@/views/notFound/index.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path.startsWith('/home') && !token) return '/login'
  if (to.path === '/login' && token) return '/home'
})

export default router
