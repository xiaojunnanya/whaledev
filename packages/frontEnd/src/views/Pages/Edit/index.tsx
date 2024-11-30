import { memo, useEffect, useRef, useState } from 'react'
import { ContentStyled } from './style'
import Left, { editLeftTop, itemProps } from './Left'
import Middle from './Middle'
import Right from './Right'

import affixImg from '@/assets/images/svg/affix.svg'
import noaffixImg from '@/assets/images/svg/notAffix.svg'
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { useGlobal } from '@/stores/global'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default memo(() => {
  const { setWidth } = useGlobal()
  const editMiddleContent = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<itemProps>({} as itemProps) // 左侧激活的项
  // 左侧是否固定
  const [isAffix, setIsAffix] = useState(false)
  // 左侧是否拉伸开
  const [leftwiden, setLeftwiden] = useState(false)

  // 右侧是否打开
  const [rightContentExpand, setRightContentExpand] = useState(true)

  useEffect(() => {
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [isAffix, rightContentExpand, leftwiden])

  const handleWindowResize = () => {
    setWidth(editMiddleContent.current?.offsetWidth || 0)
  }

  return (
    <ContentStyled>
      <DndProvider backend={HTML5Backend}>
        <div className="edit-left">
          <Left activeObj={{ active, setActive }}></Left>
        </div>
        <div
          className="left-aside"
          style={{
            display: active.key ? 'block' : 'none',
            position: isAffix ? 'static' : 'absolute',
            width: leftwiden ? '498px' : '298px',
          }}
          onTransitionEnd={handleWindowResize}
        >
          <div className="side-top">
            <div className="side-top-title">{active.title}</div>
            <div className="side-top-right">
              <img
                src={isAffix ? noaffixImg : affixImg}
                onClick={() => setIsAffix(!isAffix)}
              />
              <span
                onClick={() => {
                  setLeftwiden(!leftwiden)
                }}
              >
                {leftwiden ? <LeftOutlined /> : <RightOutlined />}
              </span>
              <CloseOutlined onClick={() => setActive({} as itemProps)} />
            </div>
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
