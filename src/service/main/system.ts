import request from '..'

//用户的网络请求
export const postUserListData = (queryInfo: any) =>
  request.post({ url: 'users/list', data: queryInfo })

//根据id删除用户
export const deleteUserData = (id: number) => request.delete({ url: `/users/${id}` })
