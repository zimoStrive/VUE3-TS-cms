import { postUserListData, deleteUserData } from '@/service/main/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersTotalCount: 0,
    usersList: []
  }),
  actions: {
    async getUserListDataAction(queryInfo: any) {
      //请求用户列表数据
      const res = await postUserListData(queryInfo)
      this.usersList = res.data.list
      this.usersTotalCount = res.data.totalCount
    },
    async deleteUserDataAction(id: number) {
      const res = await deleteUserData(id)
      console.log(res)
    }
  }
})

export default useSystemStore
