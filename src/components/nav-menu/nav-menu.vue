<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-show="!isFold">弘源管理系统</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
      :collapse="isFold"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 1.系统总览 -->
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon><component :is="item.icon.split('el-icon-')[1]"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
              {{ subitem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '../../store/login'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '../../utils/map-menu'

// 1.获取菜单数据
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
//获取props数据
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

//监听item点击
const router = useRouter()
function handleItemClick(item: any) {
  router.push(item.url)
}

//ElMune默认菜单问题
const route = useRoute()
const currentMenu = mapPathToMenu(route.path, userMenus)
const defaultActive = ref(currentMenu.id + '')
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
