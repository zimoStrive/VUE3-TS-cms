import request from '..'

//用户的网络请求
export const postUserListData = (queryInfo: any) =>
  request.post({ url: 'users/list', data: queryInfo })
