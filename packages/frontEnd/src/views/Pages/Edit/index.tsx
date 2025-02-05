import { memo, useEffect, useRef, useState } from 'react'
import { ContentStyled } from './style'
import Left, { editLeftTop, itemProps } from './Left'
import Middle from './Middle'
import Right from './Right'

import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useGlobal } from '@/stores/global'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default memo(() => {
  const { setWidth } = useGlobal()
  const editMiddleContent = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState<itemProps>({
    key: 'componentLibrary',
  } as itemProps) // 左侧激活的项

  // 右侧是否打开
  const [rightContentExpand, setRightContentExpand] = useState(true)

  useEffect(() => {
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [rightContentExpand])

  const handleWindowResize = () => {
    if (!editMiddleContent.current) return
    const { offsetWidth } = editMiddleContent.current
    setWidth(offsetWidth || 0)
  }

  return (
    <ContentStyled>
      <DndProvider backend={HTML5Backend}>
        <div className="edit-left">
          <Left activeObj={{ active, setActive }}></Left>
        </div>
        <div className="left-aside" onTransitionEnd={handleWindowResize}>
          <div className="side-top">
            <div className="side-top-title">{active.title}</div>
          </div>
          <div style={{ height: 'calc(100% - 40px)' }}>
            {editLeftTop.filter(item => item.key === active.key)[0]?.children}
          </div>
        </div>
        <div className="edit-middle">
          <div className="edit-middle-content" ref={editMiddleContent}>
            <Middle />
          </div>
        </div>
        <div className="right-dot">
          <div
            className="dot"
            onClick={() => {
              setRightContentExpand(!rightContentExpand)
            }}
          >
            {rightContentExpand ? (
              <CaretRightOutlined style={{ fontSize: '9px' }} />
            ) : (
              <CaretLeftOutlined style={{ fontSize: '9px' }} />
            )}
          </div>
        </div>
        <div
          className="edit-right"
          style={{ display: rightContentExpand ? 'block' : 'none' }}
          onTransitionEnd={handleWindowResize}
        >
          <Right></Right>
        </div>
      </DndProvider>
    </ContentStyled>
  )
})
