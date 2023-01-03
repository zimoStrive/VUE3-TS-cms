<template>
  <el-form label-width="60px" :model="account" ref="formRef" :rules="accountRules">
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, FormInstance } from 'element-plus'
import useLoginStore from '../../../store/login/index'
import type { IAccount } from '@/types'

const account = reactive<IAccount>({
  name: '',
  password: ''
})

// 定义form的验证规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入用户名~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20个字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '密码必须在3位以上', trigger: 'blur' }
  ]
}

// 定义登录逻辑
const formRef = ref<FormInstance>()
const loginStore = useLoginStore()
function loginAction() {
  formRef.value?.validate((valid) => {
    //是否通过验证
    if (valid) {
      const name = account.name
      const password = account.password
      //登录操作
      loginStore.accountLoginAction({ name, password })
    } else {
      ElMessage.error('错误')
    }
  })
}

// 定义暴露的属性和方法
defineExpose({
  loginAction
})
</script>

<style scoped></style>
