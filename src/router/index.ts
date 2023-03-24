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

export const asyncRoutes = [
  {
    path: '/main/analysis/dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
  },
  {
    path: '/main/analysis/overview',
    component: () => import('@/views/main/analysis/overview/overview.vue')
  },
  {
    path: '/main/product/category',
    //name: 'category',
    component: () => import('@/views/main/product/category/category.vue')
    //children: []
  },
  {
    path: '/main/story/chat',
    //name: 'category',
    component: () => import('@/views/main/story/chat/chat.vue')
    //children: []
  },
  {
    path: '/main/product/goods',
    //name: 'category',
    component: () => import('@/views/main/product/goods/goods.vue')
    //children: []
  },
  {
    path: '/main/story/list',
    //name: 'category',
    component: () => import('@/views/main/story/list/list.vue')
    //children: []
  },
  {
    path: '/main/system/department',
    //name: 'category',
    component: () => import('@/views/main/system/department/department.vue')
    //children: []
  },
  {
    path: '/main/system/menu',
    //name: 'category',
    component: () => import('@/views/main/system/menu/menu.vue')
    //children: []
  },
  {
    path: '/main/system/role',
    //name: 'category',
    component: () => import('@/views/main/system/role/role.vue')
    //children: []
  },
  {
    path: '/main/system/user',
    //name: 'category',
    component: () => import('@/views/main/system/user/user.vue')
    //children: []
  }
]

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) return '/login'
  if (to.path === '/login' && token) return '/main'
  //动态展示main的第一个menu
  if (to.path === '/main') return firstMenu.url
})

export default router
