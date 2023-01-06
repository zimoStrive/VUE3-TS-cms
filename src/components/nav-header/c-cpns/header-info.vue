<template>
  <div class="header-info">
    <div class="operation">
      <el-icon size="20px"><bell /></el-icon>
      <span class="dot"></span>
      <el-icon size="20px"><ChatDotRound /></el-icon>
      <el-icon size="20px"><Postcard /></el-icon>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="20"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span class="name"> Zimo </span>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleCloseFilled /></el-icon>退出系统</el-dropdown-item
            >
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>个人信息</el-dropdown-item
            >
            <el-dropdown-item
              ><el-icon><Unlock /></el-icon>修改密码</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { localCache } from '@/utils/cache'
const router = useRouter()
function handleExitClick() {
  localCache.deleteCache('token')
  localCache.deleteCache('userInfo')
  localCache.deleteCache('userMenus')
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}
.operation {
  display: flex;
  margin-right: 20px;
  position: relative;
  .el-icon {
    margin-right: 5px;

    &:hover {
      background: #f2f2f2;
    }
  }
  .dot {
    position: absolute;
    background: red;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    z-index: 10;
    right: 27px;
    top: -2px;
  }
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  .name {
    margin-left: 8px;
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
