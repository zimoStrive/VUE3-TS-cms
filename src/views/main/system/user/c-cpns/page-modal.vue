<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isEditRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入用户名" v-model="formData.name" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input placeholder="请输入真实姓名" v-model="formData.realname" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-show="isEditRef">
          <el-input placeholder="请输入密码" v-model="formData.password" type="password" />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input placeholder="请输入手机号码" v-model="formData.cellphone" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="deparmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlerConfirmClick"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

const centerDialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
//获取role，department数据
const mainStore = useMainStore()
const { entireDepartments, entireRoles } = storeToRefs(mainStore)
//控制密码框显示
const isEditRef = ref(true)
const editData = ref()
// 新建或者编辑
function setDialogVisible(isEdit: boolean = false, data?: any) {
  centerDialogVisible.value = true
  isEditRef.value = !isEdit
  editData.value = data
  for (const key in formData) {
    //编辑状态
    if (isEdit && data) {
      formData[key] = data[key]
    } else {
      //新建
      formData[key] = ''
    }
  }
}

defineExpose({ setDialogVisible })

//点击确定按钮
const systemStore = useSystemStore()
function handlerConfirmClick() {
  // 判断状态请求各个接口
  if (!isEditRef.value) {
    systemStore.updateUserDataAction(editData.value.id, formData)
  } else {
    systemStore.newUserDataAction(formData)
  }

  centerDialogVisible.value = false
}
</script>

<style scoped></style>
