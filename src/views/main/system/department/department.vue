<template>
  <div class="department">
    <PageSearch @queryClick="handlerQueryClick" @resetClick="handlerResetClick" />
    <PageContent
      ref="contentRef"
      @newDataClick="handlerNewDataClick"
      @editDataClick="handlerEditDataClick"
    />
    <PageModel ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModel from './c-cpns/page-modal.vue'
import { ref } from 'vue'

//contenth组件操作
const contentRef = ref<InstanceType<typeof PageContent>>()
function handlerQueryClick(queryInfo: any) {
  contentRef?.value.getPageList(queryInfo)
}
function handlerResetClick() {
  contentRef?.value.getPageList()
}

//modal的逻辑处理
const modelRef = ref<InstanceType<typeof PageModel>>()
function handlerNewDataClick() {
  modelRef.value?.setDialogVisible()
}

function handlerEditDataClick(formData: any) {
  modelRef.value?.setDialogVisible(true, formData)
}
</script>
<style scoped></style>
