import request from '..'

//用户的网络请求
export const postUserListData = (queryInfo: any) =>
  request.post({ url: 'users/list', data: queryInfo })

//根据id删除用户
export const deleteUserData = (id: number) => request.delete({ url: `/users/${id}` })

//获取部门信息
export const getDepartmentData = (queryInfo: any) =>
  request.post({ url: '/department/list', data: queryInfo })

//获取角色的信息
export const getRoleData = (queryInfo: any) => request.post({ url: '/role/list', data: queryInfo })

//创建用户
export const newUserData = (userInfo: any) => request.post({ url: `/users`, data: userInfo })

//编辑用户
export const editUserData = (id: number, userInfo: any) =>
  request.patch({ url: `/users/${id}`, data: userInfo })

/* 获取页面的数据 */
export const getPageListData = (pageName: string, queryInfo: any) =>
  request.post({ url: `/${pageName}/list`, data: queryInfo })

export const deletePageData = (pageName: string, id: number) =>
  request.delete({ url: `/${pageName}/${id}` })

export const newPageData = (pageName: string, dataInfo: any) =>
  request.post({ url: `/${pageName}`, data: dataInfo })

export const editPageData = (pageName: string, id: number, dataInfo: any) =>
  request.patch({ url: `/${pageName}/${id}`, data: dataInfo })
