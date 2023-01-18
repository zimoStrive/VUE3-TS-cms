import {
  postUserListData,
  deleteUserData,
  newUserData,
  editUserData,
  getPageListData,
  deletePageData,
  editPageData,
  newPageData
} from '@/service/main/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { ElMessage } from 'element-plus'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersTotalCount: 0,
    usersList: [],
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    //获取用户列表
    async getUserListDataAction(queryInfo: any) {
      //请求用户列表数据
      const res = await postUserListData(queryInfo)
      this.usersList = res.data.list
      this.usersTotalCount = res.data.totalCount
    },
    //删除用户
    async deleteUserDataAction(id: number) {
      const res = await deleteUserData(id)
      //重新获取列表数据
      this.getUserListDataAction({ offset: 0, size: 10 })
    },
    // 添加用户
    async newUserDataAction(userInfo: any) {
      const res = await newUserData(userInfo)
      console.log(13)
      if (res.code == 400) return ElMessage.error('创建用户失败~')
      //重新获取列表数据
      this.getUserListDataAction({ offset: 0, size: 10 })
      ElMessage.success('创建用户成功~')
    },
    // 编辑用户
    async updateUserDataAction(userInfo: any, id: number) {
      const res = await editUserData(userInfo, id)
      //重新获取列表数据
      this.getUserListDataAction({ offset: 0, size: 10 })
      console.log(res)
    },

    /* 获取页面的网络请求 */
    async getPageListDataAction(pageName: string, queryInfo: any) {
      const res = await getPageListData(pageName, queryInfo)
      this.pageList = res.data.list
      this.pageTotalCount = res.data.totalCount
    },

    //删除操作
    async deletePageDataAction(pageName: string, id: number) {
      const res = await deletePageData(pageName, id)
      //重新获取列表数据
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      console.log(res)
    },

    //编辑操作
    async editPageDataAction(pageName: string, id: number, dataInfo: any) {
      const res = await editPageData(pageName, id, dataInfo)
      //重新获取列表数据
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      console.log(res)
    },

    //新增操作
    async newPageDataAction(pageName: string, dataInfo: any) {
      const res = await newPageData(pageName, dataInfo)
      //重新获取列表数据
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      console.log(res)
    }
  }
})

export default useSystemStore
