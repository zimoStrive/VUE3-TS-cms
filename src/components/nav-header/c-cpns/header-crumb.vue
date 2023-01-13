<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <template v-for="(item, index) in breadcrumbs" :key="index">
      <el-breadcrumb-item :to="item.path">{{ item.name.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mapPathToBreadcrumb } from '@/utils/map-menu'
import useLoginStore from '@/store/login'

//根据路径的变化计算新的面包屑
const breadcrumbs = computed(() => {
  const route = useRoute()
  const loginStore = useLoginStore()
  const breadcrumbs = mapPathToBreadcrumb(route.path, loginStore.userMenus)
  //console.log(breadcrumbs)
  return breadcrumbs
})
</script>

<style scoped></style>
