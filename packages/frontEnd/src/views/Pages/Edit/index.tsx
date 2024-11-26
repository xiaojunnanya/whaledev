import { memo, useEffect, useRef, useState } from 'react'
import { ContentStyled } from './style'
import Left, { itemProps } from './Left'
import Middle from './Middle'
import Right from './Right'

import affixImg from '@/assets/images/svg/affix.svg'
import noaffixImg from '@/assets/images/svg/notAffix.svg'
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { useGlobal } from '@/stores/global'

export default memo(() => {
  const { setWidth } = useGlobal()
  const editMiddleContent = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<itemProps>({} as itemProps) // 左侧激活的项
  // 左侧是否固定
  const [isAffix, setIsAffix] = useState(false)

  // 右侧是否打开
  const [rightContentExpand, setRightContentExpand] = useState(true)

  useEffect(() => {
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [isAffix, rightContentExpand])

  const handleWindowResize = () => {
    setWidth(editMiddleContent.current?.offsetWidth || 0)
  }

  return (
    <ContentStyled>
      <div className="edit-left">
        <Left activeObj={{ active, setActive }}></Left>
      </div>
      <div
        className="left-aside"
        style={{
          display: active.key ? 'block' : 'none',
          position: isAffix ? 'static' : 'absolute',
        }}
      >
        <div className="side-top">
          <div className="side-top-title">{active.title}</div>
          <div className="side-top-right">
            <img
              src={isAffix ? noaffixImg : affixImg}
              onClick={() => setIsAffix(!isAffix)}
            />
            <CloseOutlined onClick={() => setActive({} as itemProps)} />
          </div>
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
    </ContentStyled>
  )
})
