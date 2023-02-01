import { localCache } from '@/utils/cache'

const usePermission = (pageName: string, handlerName: string) => {
  const queryPermission = `${pageName}:${handlerName}`
  const permissions = localCache.getCache('permissions')
  return !!permissions.find((item: string) => item.includes(queryPermission))
}

export default usePermission
