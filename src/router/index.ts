import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '../utils/cache'
import { firstMenu } from '../utils/map-menu'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/index.vue')
    },
    {
      path: '/:patcMatch(.*)',
      component: () => import('@/views/notFound/index.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) return '/login'
  if (to.path === '/login' && token) return '/main'
  //动态展示main的第一个menu
  if (to.path === '/main') return firstMenu.url
})

export default router
