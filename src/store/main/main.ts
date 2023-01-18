import { defineStore } from 'pinia'
import { getDepartmentData, getRoleData } from '@/service/main/system'

interface ImainState {
  entireDepartments: any[]
  entireRoles: any[]
}

const useMainStore = defineStore('main', {
  state: (): ImainState => ({
    entireDepartments: [],
    entireRoles: []
  }),

  actions: {
    async fetchEntireDateAction() {
      const departmentRes = await getDepartmentData({ offset: 0, size: 10 })
      const roleRes = await getRoleData({ offset: 0, size: 10 })
      console.log(roleRes, departmentRes)
      this.entireDepartments = departmentRes.data.list
      this.entireRoles = roleRes.data.list
    }
  }
})

export default useMainStore
