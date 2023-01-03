import hyRequest from '..'
import IAccount from '@/types'

export function accountLogin(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserById(id: number) {
  return hyRequest.get({
    url: '/users/' + id
  })
}

export function getRoleMenus(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
