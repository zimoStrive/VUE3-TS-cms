<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isEditRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px" size="large">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="formData.parentId"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="value in item.options" :key="value.value">
                  <el-option :value="value.value" :label="value.label" />
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </template>
          </el-form-item>
        </template>
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

//定义props
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
const props = defineProps<IProps>()
console.log(props.modalConfig)

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
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formData)
  } else {
    systemStore.newPageDataAction(props.modalConfig.pageName, formData)
  }

  centerDialogVisible.value = false
}
</script>

<style scoped></style>
