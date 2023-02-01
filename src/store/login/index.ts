import { accountLogin, getUserById, getRoleMenus } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes, mapMenuToPersssions } from '@/utils/map-menu'
import router from '@/router'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
  permissions: string[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),

  actions: {
    async accountLoginAction(account: IAccount) {
      //1.获取登录信息
      const loginRes = await accountLogin(account)
      const { id, token } = loginRes.data
      this.token = token

      //保存在本地存储
      localCache.setCache('token', token)

      //获取用户信息
      const userRes = await getUserById(id)
      this.userInfo = userRes.data
      localCache.setCache('userInfo', this.userInfo)

      //根据roleid获取菜单
      const roleId = this.userInfo.role.id
      const menuRes = await getRoleMenus(roleId)
      this.userMenus = menuRes.data
      localCache.setCache('userMenus', this.userMenus)

      //获取按钮权限信息
      const permissions = mapMenuToPersssions(this.userMenus)
      this.permissions = permissions
      localCache.setCache('permissions', this.permissions)

      //获取所有数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDateAction()

      //动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      //路由跳转
      router.push('/main')
    },

    loadLocalCacheAction() {
      //用户进行刷新默认加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //动态添加路由
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => router.addRoute('main', route))

        //获取所有数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDateAction()
      }
    }
  }
})

export default useLoginStore
