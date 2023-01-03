import { accountLogin } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

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
    }
  }
})

export default useLoginStore
