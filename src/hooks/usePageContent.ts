import type PageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handlerQueryClick(queryInfo: any) {
    contentRef.value?.getPageList(queryInfo)
  }
  function handlerResetClick() {
    contentRef.value?.getPageList()
  }

  return {
    handlerQueryClick,
    handlerResetClick,
    contentRef
  }
}

export default usePageContent
