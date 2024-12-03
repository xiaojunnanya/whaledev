import { memo, useMemo, useState } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import { ServiceLayoutStyled } from './style'
import FlowNode from '../FlowNode'

export interface NodeType {
  id: string
  type: 'start' | 'end' | 'normal' | 'condition'
  title: string
  content?: string
  config?: any
  children?: NodeType[]
}

export default memo(() => {
  const [list, setList] = useState<NodeType[]>([
    {
      id: 'start',
      type: 'start',
      title: '开始',
    },
    {
      id: 'end',
      type: 'end',
      title: '结束',
    },
  ])

  const renderNode = (nodes: any) => {
    return nodes.map((node: any) => {
      return (
        <FlowNode
          key={node.id}
          type={node.type}
          node={node}
          renderNode={renderNode}
        />
      )
    })
  }

  const renderNodeList = useMemo(() => {
    return renderNode(list)
  }, [list])

  return (
    <ServiceLayoutStyled>
      <InfiniteViewer
        className="viewer"
        displayHorizontalScroll={false}
        useMouseDrag={true}
        useWheelScroll={true}
        useAutoZoom={true}
        zoomRange={[0.5, 10]}
        zoom={1.5}
        useResizeObserver={true}
      >
        <div className="container">{renderNodeList}</div>
      </InfiniteViewer>
    </ServiceLayoutStyled>
  )
})
