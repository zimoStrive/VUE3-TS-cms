<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isEditRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px" size="large">
        <el-form-item label="部门名称" prop="name">
          <el-input placeholder="请输入用户名" v-model="formData.name" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input placeholder="请输入真实姓名" v-model="formData.leader" />
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择上级" style="width: 100%">
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
  leader: '',
  parentId: ''
})
//获取role，department数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)
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
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    systemStore.newPageDataAction('department', formData)
  }

  centerDialogVisible.value = false
}
</script>

<style scoped></style>
