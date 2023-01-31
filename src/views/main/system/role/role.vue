<template>
  <div class="role">
    <pageSearch
      :search-config="searchConfig"
      @queryClick="handlerQueryClick"
      @resetClick="handlerResetClick"
    />
    <pageContent
      ref="contentRef"
      :content-config="contentConfig"
      @newDataClick="handlerNewDataClick"
      @editDataClick="handlerEditDataClick"
    />
    <pageModal :modal-config="modalConfig" ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="role">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//contenth组件操作
const { contentRef, handlerQueryClick, handlerResetClick } = usePageContent()

//modal的逻辑处理
const { modelRef, handlerNewDataClick, handlerEditDataClick } = usePageModal()
</script>

<style scoped></style>
