<template>
  <div class="department">
    <PageSearch
      @queryClick="handlerQueryClick"
      @resetClick="handlerResetClick"
      :search-config="searchConfig"
    />
    <PageContent
      ref="contentRef"
      @newDataClick="handlerNewDataClick"
      @editDataClick="handlerEditDataClick"
      :content-config="contentConfig"
    >
      <template #leader="scope">
        <span class="textColor">--{{ scope.row[scope.prop] }}</span>
      </template>
    </PageContent>
    <PageModel :modal-config="modalConfigRef" ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageModel from '@/components/page-modal/page-modal.vue'
import PageContent from '@/components/page-content/page-content.vue'
import { computed } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//对modalCofig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

//contenth组件操作
const { contentRef, handlerQueryClick, handlerResetClick } = usePageContent()

//modal的逻辑处理
const { modelRef, handlerNewDataClick, handlerEditDataClick } = usePageModal()
</script>
<style scoped>
.textColor {
  color: yellowgreen;
}
</style>
