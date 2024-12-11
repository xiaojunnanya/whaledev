import { memo, useState } from 'react'
import { NodeType } from '../ServiceLayout'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { generateId } from '@/utils'
// import { useGlobal } from '@/stores/global'
import { cloneDeep } from 'lodash-es'
import { message } from 'antd'
import { findNodeIndexAndParent } from '@/utils/components'
import ActionModal from '../ActionModal'

interface IProps {
  type: NodeType['type']
  node: NodeType
  renderNode: any
  list: NodeType[]
  setList: (list: any) => void
}

type nodeParentType = 'condition' | 'success' | 'fail' | 'normal' | undefined

export default memo((props: IProps) => {
  const { type, node, renderNode, list, setList } = props
  // 遗留的问题：visibility 的问题
  // const { setMessage } = useGlobal()
  const [showActionModal, setShowActionModal] = useState(false)
  const [editNode, setEditNode] = useState<NodeType>({} as NodeType)

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

  // 创建节点，id是他前面节点的id
  const handleCreateNode = (type: 'normal' | 'condition', id: string) => {
    // 普通节点创建需要弹框输入节点名称
    if (type === 'normal') {
      createNode('节点' + generateId(4), type, id)
    } else {
      // 条件节点直接创建
      createNode('', type, id)
    }
  }

  /**
   * 不能创建节点的情况
   * 1. 开始节点后第一个节点不能添加分支节点
   * 2. 分支节点后第一个节点不能添加分支节点
   * 3. 分支节点前第一个节点不能添加分支节点
   */
  const createNode = (
    title: string,
    type: 'normal' | 'condition',
    id: string,
  ) => {
    const nodeList = cloneDeep(list)
    const node = findNodeIndexAndParent(nodeList, id)
    if (!node) return

    const parentNode = node.parentNode

    // 拿到点击创建的当前节点，查看当前节点的下一个节点是否为是条件节点
    const nestNode = (parentNode ? parentNode.children : nodeList)[
      node.index + 1
    ]

    if (nestNode && nestNode.type === 'condition' && type === 'condition') {
      message.error('分支节点前一个节点不能添加分支节点')
      return
    }

    // 创建一个普通节点
    const taskNode = {
      id: generateId(),
      type,
      title,
      content: '编排节点',
      config: {},
      children: [],
    }

    const parentNodeType: nodeParentType = parentNode?.type

    switch (parentNodeType) {
      case undefined:
        if (type === 'normal') {
          nodeList.splice(node.index + 1, 0, taskNode)
        } else {
          if (node.selfNode.type === 'start') {
            message.error('开始节点后第一个节点不能添加分支节点')
            return
          }
          if (node.selfNode.type === 'condition') {
            message.error('分支节点后第一个节点不能添加分支节点')
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
        break
      case 'success':
      case 'fail':
        if (node.selfNode.type === 'condition' && type === 'condition') {
          message.error('分支节点后第一个节点不能添加分支节点')
          return
        }
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
        break
      case 'normal':
        // 遗留的问题：待验证，是否有这种情况
        node.parentNode.children.splice(node.index + 1, 0, taskNode)
        break
      case 'condition':
        if (type === 'condition') {
          message.error('分支节点后第一个节点不能添加分支节点')
          return
        }
        node.parentNode.children[node.index].children.unshift(taskNode)
        break
    }

    setList(() => [...nodeList])
  }

  // 修改节点行为
  const onEditAction = (node: NodeType) => {
    if (node.title === '成功' || node.title === '失败') {
      message.info('请在此节点后新增执行节点')
      return
    }

    setEditNode(node)
    setShowActionModal(true)
  }

  //   删除节点
  // 遗留的问题：删除这边也有一定的限制
  const handleDelNode = (event: React.MouseEvent, id: string) => {
    event.stopPropagation()
    const nodeList = cloneDeep(list)
    const node = findNodeIndexAndParent(nodeList, id)
    if (!node) return

    const parentNodeType: nodeParentType = node.parentNode?.type

    switch (parentNodeType) {
      case undefined:
        nodeList.splice(node.index, 1)
        break
      case 'success':
      case 'fail':
      case 'normal':
        node.parentNode.children.splice(node.index, 1)
        break
      case 'condition':
        const parentNode = findNodeIndexAndParent(
          nodeList,
          node?.parentNode?.id,
        )
        if (!parentNode) return
        if (parentNode.parentNode) {
          parentNode.parentNode.children.splice(parentNode.index, 1)
        } else {
          nodeList.splice(parentNode.index, 1)
        }
        break
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

      <>
        <ActionModal
          showModal={{ showActionModal, setShowActionModal }}
          editNode={editNode}
          setList={setList}
          list={list}
        />
      </>
    </>
  )
})
