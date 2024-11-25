import { memo, useState } from 'react'
import { LeftStyled } from './style'

import componentLibrary from '@/assets/images/svg/componentLibrary.svg'
import dataSource from '@/assets/images/svg/dataSource.svg'
import outlineTree from '@/assets/images/svg/outlineTree.svg'
import sourceCode from '@/assets/images/svg/sourceCode.svg'
import howUse from '@/assets/images/svg/howUse.svg'

type activeType =
  | 'outlineTree'
  | 'componentLibrary'
  | 'dataSource'
  | 'sourceCode'
  | null

export interface itemProps {
  key: activeType
  title: string
  icon: JSX.Element
}

const editLeftTop: itemProps[] = [
  {
    key: 'outlineTree',
    title: '大纲树',
    icon: <img src={outlineTree} alt="outlineTree" />,
  },
  {
    key: 'componentLibrary',
    title: '组件库',
    icon: <img src={componentLibrary} alt="componentLibrary" />,
  },
  {
    key: 'dataSource',
    title: '数据源',
    icon: <img src={dataSource} alt="dataSource" />,
  },
  {
    key: 'sourceCode',
    title: '源码',
    icon: <img src={sourceCode} alt="sourceCode" />,
  },
]

const editLeftBottom = [
  {
    key: 'howUse',
    title: '如何使用',
    icon: <img src={howUse} alt="howUse" />,
  },
]

export default memo(() => {
  const [active, setActive] = useState<itemProps>({} as itemProps)

  return (
    <LeftStyled className="edit-left">
      <div className="edit-left-top">
        {editLeftTop.map(item => {
          return (
            <div
              key={item.key}
              className={`edit-left-top-item edit-left-item ${
                active.key === item.key ? 'edit-left-active' : ''
              }`}
              onClick={() =>
                setActive(item.key === active.key ? ({} as itemProps) : item)
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          )
        })}
      </div>
      <div className="edit-left-bottom">
        {editLeftBottom.map(item => {
          return (
            <div
              key={item.key}
              className="edit-left-bottom-item edit-left-item"
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          )
        })}
      </div>
    </LeftStyled>
  )
})
