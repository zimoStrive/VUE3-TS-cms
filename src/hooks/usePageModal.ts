import type PageModel from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'

type CallbackFnType = (data?: any) => void

function usePageModal(newCallback?: CallbackFnType, editCallback?: CallbackFnType) {
  const modelRef = ref<InstanceType<typeof PageModel>>()
  function handlerNewDataClick() {
    modelRef.value?.setDialogVisible()
    if (newCallback) newCallback()
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
