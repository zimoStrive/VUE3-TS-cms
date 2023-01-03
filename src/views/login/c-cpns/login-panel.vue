<template>
  <div class="panel">
    <h1 class="title">后台管理系统</h1>
    <!-- 中间的tabs切换 -->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- 账号登录的 Pane -->
      <el-tab-pane label="账号登录" name="account">
        <template #label>
          <span class="icon">
            <el-icon><UserFilled /></el-icon>
            <span class="text">账号登录</span>
          </span>
        </template>
        <PanelAccount ref="accountRef" />
      </el-tab-pane>
      <!-- 手机登录的 pane -->
      <el-tab-pane label="手机登录" name="phone">
        <template #label>
          <span class="icon">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <PanelPhone />
      </el-tab-pane>
    </el-tabs>
    <!-- 底部区域 -->
    <div class="control-account">
      <el-checkbox label="记住密码" v-model="isKeep"></el-checkbox>
      <el-link type="primary">记住密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginAction">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import PanelPhone from './panel-phone.vue'
import PanelAccount from './panel-account.vue'
import { ref } from 'vue'
const isKeep = ref(false)
const currentTab = ref('account')

const accountRef = ref<InstanceType<typeof PanelAccount>>()

function loginAction() {
  console.log('登录')
  accountRef.value?.loginAction()
}
</script>

<style scoped lang="less">
.panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
