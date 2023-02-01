import type PageModel from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'

type EditFnType = (data: any) => void

function usePageModal(editCallback?: EditFnType) {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  function handlerNewDataClick() {
    modelRef.value?.setDialogVisible()
  }

  function handlerEditDataClick(formData: any) {
    modelRef.value?.setDialogVisible(true, formData)
    if (editCallback) editCallback(formData)
  }
  return {
    modelRef,
    handlerNewDataClick,
    handlerEditDataClick
  }
}

export default usePageModal
