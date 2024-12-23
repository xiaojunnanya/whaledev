import { NodeType } from '@/views/Pages/Edit/Right/ComponentEvent/ServiceLayout'
import { cloneDeep } from 'lodash-es'
import { convertArrayToLinkedList, createFunction } from './actionFun'

/**
 * 事件行为是数组结构，为了保证串联执行，需要转换成链表结构
 * 必须保证第一个行为执行完以后，再执行第二个行为
 * @param params 事件触发时，组件传递的参数
 */
export function handleActionFlow(actions: NodeType[]) {
  const arr = cloneDeep(actions)
  // 去头去尾
  arr.pop()
  arr.shift()
  // 遗留的问题：不使用链表，就使用数组进行遍历的方式来执行编排
  const nodes = convertArrayToLinkedList(arr)
  if (nodes?.action) {
    execAction(nodes)
  }
}

/**
 * 递归执行事件行为
 * params是按钮触发是，组件传递的参数
 * action中的data为行为配置中手工配置的参数
 */
const execAction = (node: any) => {
  if (!node || !node?.action) return
  try {
    const action = node.action
    const type = action?.actionType
    switch (type) {
      case 'jumpLink':
        const link = action['jumpLink-link']
        if (action['jumpLink-type'] === 'alink') {
          window.open(link)
        } else {
          window.location.href = link
        }
        break
      case 'reloadPage':
        window.location.reload()
        break
      case 'scriptRun':
        const script = action['scriptRun-run']
        const fun = createFunction(script)
        fun()()
        break
      default:
        break
    }
  } catch (error) {
    console.error(`服务编排[${node.actionType}执行异常]`, error)
  }
}
