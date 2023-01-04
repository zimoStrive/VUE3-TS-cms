import { accountLogin, getUserById, getRoleMenus } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { getUserById } from '../../service/login/login'
import router from '@/router'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),

  actions: {
    async accountLoginAction(account: IAccount) {
      //1.获取登录信息
      const loginRes = await accountLogin(account)
      console.log(loginRes)
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
      //路由跳转
      router.push('/home')
    }
  }
})

export default useLoginStore
