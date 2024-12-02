import { memo } from 'react'
import InfiniteViewer from 'react-infinite-viewer'
import { ServiceLayoutStyled } from './style'

export default memo(() => {
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
        <div className="container">服务编排</div>
      </InfiniteViewer>
    </ServiceLayoutStyled>
  )
})
