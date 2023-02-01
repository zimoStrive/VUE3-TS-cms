import { defineStore } from 'pinia'
import { getDepartmentData, getRoleData, getMenuData } from '@/service/main/system'

interface ImainState {
  entireDepartments: any[]
  entireRoles: any[]
  entireMenu: any[]
}

const useMainStore = defineStore('main', {
  state: (): ImainState => ({
    entireDepartments: [],
    entireRoles: [],
    entireMenu: []
  }),

  actions: {
    async fetchEntireDateAction() {
      const departmentRes = await getDepartmentData({ offset: 0, size: 10 })
      const roleRes = await getRoleData({ offset: 0, size: 10 })
      const menuRes = await getMenuData()
      //console.log(roleRes, departmentRes, menuRes)
      this.entireDepartments = departmentRes.data.list
      this.entireRoles = roleRes.data.list
      this.entireMenu = menuRes.data.list
    }
  }
})

export default useMainStore
