import { cloneDeep } from 'lodash-es'

// 查找并替换节点
export function replaceNodeById(data: any[], nodeId: string, newObj: any) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === nodeId) {
      data[i] = { ...newObj } // 替换找到的节点
      return data // 找到并替换后退出
    }
    // 如果节点有子节点，递归查找
    if (data[i].children && data[i].children.length > 0) {
      replaceNodeById(data[i].children, nodeId, newObj)
    }
  }

  return data
}

/**
 * 事件行为是数组结构，为了保证串联执行，需要转换成链表结构
 * 必须保证第一个行为执行完以后，再执行第二个行为
 * @param params 事件触发时，组件传递的参数
 */
export function handleActionFlow(actions: any, params: any) {
  const arr = cloneDeep(actions)
  // 去头去尾
  arr.pop()
  arr.shift()
  const nodes = convertArrayToLinkedList(arr)
  if (nodes?.action) {
    execAction(nodes, params)
  }
}

/**
 * 把工作流转换为链表结构
 * @param nodes
 * @param isSuccessBranch 区分当前处理的是条件节点的 成功分支 还是 失败分支
 * @returns
 */
function convertArrayToLinkedList(nodes: any, isSuccessBranch = true) {
  // 当前节点末尾指针
  let tailNode: any = null
  // 链表的头部
  let linkedList: any = null

  // 如果只有一个节点，直接返回
  if (nodes.length === 1) {
    return { action: { ...nodes[0].config } }
  }

  for (const node of nodes) {
    let newNode: any = { action: { ...node.config } }

    // 处理分支节点
    if (node.type === 'condition') {
      const successBranch = convertArrayToLinkedList(
        node.children.find((child: any) => child.type === 'success')
          ?.children || [],
        true,
      )

      const failBranch = convertArrayToLinkedList(
        node.children.find((child: any) => child.type === 'fail')?.children ||
          [],
        false,
      )

      newNode = { success: successBranch, fail: failBranch }

      // 将新的节点链接到当前节点
      if (!tailNode) {
        linkedList = tailNode = newNode
      } else {
        if (isSuccessBranch) {
          // next 适用于普通节点和条件节点的成功路径
          tailNode.next = newNode
        } else {
          tailNode.fail = newNode
        }
        tailNode = newNode // 更新尾节点
      }

      // 处理分支后面的节点
      const behindList = nodes.slice(nodes.indexOf(node) + 1)
      if (behindList.length > 0) {
        // 通过递归方式附加剩余的节点
        const behindLinkedList = convertArrayToLinkedList(behindList, true)
        if (isSuccessBranch) {
          if (!tailNode.success) {
            tailNode.success = behindLinkedList
          } else {
            let current = tailNode.success
            while (current.next) {
              current = current.next
            }
            current.next = behindLinkedList
          }
        } else {
          if (!tailNode.fail) {
            tailNode.fail = behindLinkedList
          } else {
            let current = tailNode.fail
            while (current.next) {
              current = current.next
            }
            current.next = behindLinkedList
          }
        }
      }
    } else {
      // 处理非条件节点
      if (!tailNode) {
        linkedList = tailNode = newNode
      } else {
        if (isSuccessBranch) {
          tailNode.next = newNode
        } else {
          tailNode.next = newNode
        }
        tailNode = newNode // 更新尾节点
      }
    }
  }

  return linkedList
}

/**
 * 递归执行事件行为
 * params是按钮触发是，组件传递的参数
 * action中的data为行为配置中手工配置的参数
 */
const execAction = (node: any, params: any = {}) => {
  if (!node || !node?.action) return
  console.log(node, 'node')
  try {
    const type = node.action?.actionType
    switch (type) {
      case 'jumpLink':
        break
      default:
        break
    }
  } catch (error) {
    console.error(`服务编排[${node.actionType}执行异常]`, error)
  }
}
