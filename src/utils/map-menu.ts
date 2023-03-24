import type { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '@/router/index'

//  function loadLocalRoutes() {
//   //动态获取所有路由对象，放到数组中，
//   //路由对象都是在独立文件中
//   //从文件中将所有路由对象先读取数组中
//   const localRoutes: RouteRecordRaw[] = []
//   //读取router/main/所有ts文件
//   const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
//   // console.log(files)

//   //将加载的对象放到localRoutes
//   for (const key in files) {
//     const module = files[key].default
//     localRoutes.push(module)
//   }
//   return localRoutes
// }

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  //根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = asyncRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //给route的顶层菜单增加重定向功能（但是只需要添加一次即可）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route })
        }
        //添加二级菜单对应的路径
        routes.push(route)
      }
      //记录第一个被匹配的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * @param path 需要配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) return submenu
    }
  }
  return undefined
}

interface IBredcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  //定义面包屑
  const breadcrumbs: IBredcrumbs[] = []

  //遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        //顶层菜单
        breadcrumbs.push({ name: menu, path: menu.url })
        //第二层菜单
        breadcrumbs.push({ name: submenu, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 *菜单映射的id列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}

/**
 *从菜单映射到按钮的权限
 * @param userMenus 菜单的列表
 * @returns 权限的字符串数组
 */
export function mapMenuToPersssions(userMenus: any) {
  const permissions: string[] = []
  function recurseGetPermission(menuList: any[]) {
    for (const menu of menuList) {
      if (menu.type === 3) {
        permissions.push(menu.permission)
      } else {
        recurseGetPermission(menu.children ?? [])
      }
    }
  }
  recurseGetPermission(userMenus)
  return permissions
}
