import { memo, useState } from 'react'
import { LeftStyled } from './style'

import {
  CodeOutlined,
  DatabaseOutlined,
  PartitionOutlined,
  ProductOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'

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
    icon: <PartitionOutlined />,
  },
  {
    key: 'componentLibrary',
    title: '组件库',
    icon: <ProductOutlined />,
  },
  {
    key: 'dataSource',
    title: '数据源',
    icon: <DatabaseOutlined />,
  },
  {
    key: 'sourceCode',
    title: '源码',
    icon: <CodeOutlined />,
  },
]

const editLeftBottom = [
  {
    key: 'howUse',
    title: '如何使用',
    icon: <QuestionCircleOutlined />,
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
