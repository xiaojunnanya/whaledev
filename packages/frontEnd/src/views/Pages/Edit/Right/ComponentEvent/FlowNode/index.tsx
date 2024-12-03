import { memo } from 'react'
import { NodeType } from '../ServiceLayout'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { generateId } from '@/utils'

interface IProps {
  type: 'start' | 'end' | 'normal' | 'condition' | 'success' | 'fail'
  node: NodeType
  renderNode: any
}

export default memo((props: IProps) => {
  const { type, node, renderNode } = props

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
    console.log(generateId(4), 'generateId(4)')
  }

  const createNode = (title: string, content: string, type: string) => {}

  // 修改节点行为
  const onEditAction = (node: NodeType) => {}

  //   删除节点
  const handleDelNode = (event: React.MouseEvent, id: string) => {}

  // 修改节点标题
  const onEditNodeTitle = (event: React.MouseEvent, node: NodeType) => {}

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
              <div
                className="title"
                onClick={event => onEditNodeTitle(event, node)}
              >
                {node.title}
              </div>
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
