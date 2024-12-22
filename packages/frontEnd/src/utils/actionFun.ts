/**
 * 把工作流转换为链表结构
 * @param nodes
 * @param isSuccessBranch 区分当前处理的是条件节点的 成功分支 还是 失败分支
 * @returns
 */
export function convertArrayToLinkedList(nodes: any, isSuccessBranch = true) {
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
 * 创建动态函数
 */
export function createFunction(body: string) {
  if (!body || typeof body !== 'string') {
    return () => {}
  }

  const scripts = body
    .replace(/^\s*\/\/.*$/gm, '') // 删除单行注释
    .replace(/\/\*[\s\S]*?\*\//g, '') // 删除单行注释
    .trim()

  // 支持内部嵌套函数
  if (scripts.startsWith('function')) {
    return new Function(`return ${scripts};`)
  }

  // 构造函数体:如果没有 return 关键字，则手动加上 return。
  const funcStr =
    scripts.indexOf('return') > -1 ? scripts : `return ${scripts};`
  return new Function(funcStr)
}
