import { Component } from '@/stores/components'

/**
 * 根据 id 递归查找组件
 *
 * @param id 组件 id
 * @param components 组件数组
 * @returns 匹配的组件或 null
 */
export function getComponentById(
  id: string | null,
  components: Component[],
): Component | null {
  if (!id) return null

  for (const component of components) {
    if (component.id == id) return component
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children)
      if (result !== null) return result
    }
  }
  return null
}

/**
 *
 * @param children 组件树
 * @param nodeId 节点id
 * @param parentNode 父节点
 * @returns {
 * index: number, // 节点在父节点中的索引
 * parentNode: any, // 父节点
 * selfNode: any // 当前节点
 * }
 */
export function findNodeIndexAndParent(
  children: any,
  nodeId: string,
  parentNode = null,
): {
  index: number
  parentNode: any
  selfNode: any
} | null {
  for (let i = 0; i < children.length; i++) {
    if (children[i].id === nodeId) {
      return { index: i, parentNode, selfNode: children[i] }
    }
    if (children[i].children) {
      const result = findNodeIndexAndParent(
        children[i].children,
        nodeId,
        children[i],
      )
      if (result) {
        return result
      }
    }
  }
  return null
}
