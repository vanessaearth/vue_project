/*
 * 权限控制指令
 * 需要加权限控制的按钮加指令v-permission=['admin]
 */
import store from '@/store'
const permission = {
  inserted (el, bidding) {
    const { value: pRoles } = bidding
    const roles = store.getters && store.getters.roles
    if (pRoles && pRoles instanceof Array && pRoles.length > 0) {
      const hasPermission = roles.some(role => {
        return pRoles.includes(role)
      })
      // 没有权限删除当前dom
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('需要指定按钮要求角色数组，如v-permission=["admin"]')
    }
  }
}
export default permission
