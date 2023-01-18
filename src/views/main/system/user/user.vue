<template>
  <div class="user">
    <!-- 1.搜索区域 -->
    <page-search @queryClick="handleQueryClick" @resetClick="handleResetClick" />
    <!-- 2.展示区域 -->
    <page-content
      ref="contentRef"
      @newDataClick="handleNewDataClick"
      @editDataClick="handlerEditClick"
    />

    <!-- 新建和编辑的dialog -->
    <PageModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

//对content组件的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.getUserList(queryInfo)
}

function handleResetClick() {
  contentRef.value?.handleResetClick()
}

function handlerEditClick(formData: any) {
  modalRef.value?.setDialogVisible(true, formData)
}

//对modal组件的操作

const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewDataClick() {
  modalRef.value?.setDialogVisible()
}
</script>

<style lang="less" scoped></style>
