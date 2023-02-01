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
    <pageModal :modal-config="modalConfig" :other-info="otherInfo" ref="modelRef">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenu"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleMenuCheckChange"
        />
      </template>
    </pageModal>
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

import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menu'

//contenth组件操作
const { contentRef, handlerQueryClick, handlerResetClick } = usePageContent()
//modal的逻辑处理
const { modelRef, handlerNewDataClick, handlerEditDataClick } = usePageModal(editCallback)

// 菜单的展示
const mainStore = useMainStore()
const { entireMenu } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleMenuCheckChange(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(data: any) {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(mapMenuListToIds(data.menuList))
  })
}
</script>

<style scoped></style>
