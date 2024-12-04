import { memo } from 'react'
import { NodeType } from '../ServiceLayout'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { generateId } from '@/utils'
// import { useGlobal } from '@/stores/global'
// import cloneDeep from 'lodash-es/cloneDeep'
import { message } from 'antd'

interface IProps {
  type: 'start' | 'end' | 'normal' | 'condition' | 'success' | 'fail'
  node: NodeType
  renderNode: any
  list: NodeType[]
  setList: (list: any) => void
}

export default memo((props: IProps) => {
  const { type, node, renderNode, list, setList } = props
  // 遗留的问题：为什么不行！！！！！！！！！！！
  // const { setMessage } = useGlobal()

  const AddNode = ({ id }: { id: string }) => {
    return (
      <span className="add-node-btn">
        <span className="add-icon">
          <PlusOutlined style={{ fontSize: 16, color: '#fff' }} />
          <div className="popover">
            <a onClick={() => handleCreateNode('normal', id)}>普通节点</a>
            <a onClick={() => handleCreateNode('condition', id)}>分支节点</a>
          </div>
        </span>
      </span>
    )
  }

  //   条件节点 - 节点项
  const ConditionItem = ({ type, children }: any) => {
    return (
      <div className="node-item">
        <span className={'left-line ' + type}></span>
        <span className={'right-line ' + type}></span>
        <span className="connect-line"></span>
        <div className="normal-container">{children}</div>
      </div>
    )
  }

  // 创建节点
  const handleCreateNode = (type: 'normal' | 'condition', id: string) => {
    // 普通节点创建需要弹框输入节点名称
    if (type === 'normal') {
      createNode('节点' + generateId(4), type, id)
    } else {
      // 条件节点直接创建
      createNode('', type, id)
    }
  }

  const createNode = (
    title: string,
    type: 'normal' | 'condition',
    id: string,
  ) => {
    const nodeList = JSON.parse(JSON.stringify(list))
    const node = findNodeIndexAndParent(nodeList, id)
    const taskNode = {
      id: generateId(),
      type,
      title,
      content: '行为配置',
      config: {},
      children: [],
    }
    if (!node.parentNode) {
      if (type === 'normal') {
        nodeList.splice(node.index + 1, 0, taskNode)
      } else {
        if (node.selfNode.type === 'start') {
          message.error('开始节点后第一个不能添加分支节点')
          return
        }
        if (node.selfNode.type === 'condition') {
          message.error('分支节点后第一个不能添加分支节点')
          return
        }
        nodeList.splice(node.index + 1, 0, {
          ...taskNode,
          children: [
            {
              id: generateId(),
              type: 'success',
              children: [],
              title: '成功',
              content: '成功时执行此流程',
            },
            {
              id: generateId(),
              type: 'fail',
              title: '失败',
              content: '失败时执行此流程',
              children: [],
            },
          ],
        })
      }
    } else if (node?.parentNode?.type === 'condition') {
      if (type === 'condition') {
        message.error('分支节点后第一个不能添加分支节点')
        return
      }
      node.parentNode.children[node.index].children.unshift(taskNode)
    } else if (['normal', 'success', 'fail'].includes(node?.parentNode?.type)) {
      if (type === 'normal') {
        node.parentNode.children.splice(node.index + 1, 0, taskNode)
      } else {
        node.parentNode.children.splice(node.index + 1, 0, {
          ...taskNode,
          children: [
            {
              ...taskNode,
              id: generateId(),
              type: 'success',
              title: '成功',
              content: '成功时执行此流程',
              children: [],
            },
            {
              ...taskNode,
              id: generateId(),
              type: 'fail',
              title: '失败',
              content: '失败时执行此流程',
              children: [],
            },
          ],
        })
      }
    }
    setList(() => [...nodeList])
  }

  // 修改节点行为
  const onEditAction = (node: NodeType) => {
    const nodeList = JSON.parse(JSON.stringify(list)) as NodeType[]
  }

  //   删除节点
  const handleDelNode = (event: React.MouseEvent, id: string) => {
    event.stopPropagation()
    const nodeList = JSON.parse(JSON.stringify(list))
    const node = findNodeIndexAndParent(nodeList, id)
    if (!node.parentNode) {
      nodeList.splice(node.index, 1)
    } else if (['success', 'fail', 'normal'].includes(node?.parentNode?.type)) {
      node.parentNode.children.splice(node.index, 1)
    } else if (node?.parentNode?.type === 'condition') {
      const parentNode = findNodeIndexAndParent(nodeList, node?.parentNode?.id)
      if (parentNode.parentNode) {
        parentNode.parentNode.children.splice(parentNode.index, 1)
      } else {
        nodeList.splice(parentNode.index, 1)
      }
    }
    setList(() => [...nodeList])
  }

  return (
    <>
      <>
        {type === 'start' && (
          <div className="start-node">
            <div className="circle-btn">开始</div>
            <span className="arrow-line"></span>
            <AddNode id="start" />
          </div>
        )}
      </>

      <>
        {type === 'end' && (
          <div className="end-node">
            <div className="circle-btn gray">结束</div>
          </div>
        )}
      </>

      <>
        {['normal', 'success', 'fail'].includes(type) && (
          <div className="normal-node">
            <div
              className={`node-info ${node.type}`}
              onClick={() => onEditAction(node)}
            >
              <div className="title">{node.title}</div>
              <div className="content">{node.content}</div>
              <DeleteOutlined
                className="icon-del"
                onClick={event => handleDelNode(event, node.id)}
              />
            </div>
            <span className="arrow-line"></span>
            <AddNode id={node.id} />
          </div>
        )}
      </>

      <>
        {type === 'condition' && (
          <div className="condition-node">
            <div className="title">分支</div>
            <div className="node-list">
              {(node.children || []).map((item: any, index: number) => {
                return (
                  <ConditionItem
                    key={item.id}
                    type={
                      index === 0
                        ? 'start'
                        : index == node.children!.length - 1
                        ? 'end'
                        : 'center'
                    }
                  >
                    {renderNode([item])}
                    {renderNode(item.children)}
                  </ConditionItem>
                )
              })}
            </div>
            <span className="arrow-line"></span>
            <AddNode id={node.id} />
          </div>
        )}
      </>
    </>
  )
})

// 查找节点的索引及其父节点
export function findNodeIndexAndParent(
  children: any,
  nodeId: string,
  parentNode = null,
): any {
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
