import { memo, ReactNode, useCallback } from 'react'
import { EditLeftStyled } from './style'

import {
  CodeOutlined,
  DatabaseOutlined,
  PartitionOutlined,
  ProductOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'

import OutlineTree from './OutlineTree'
import ComponentLibrary from './ComponentLibrary'
import DataSource from './DataSource'
import SourceCode from './SourceCode'

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
  children: ReactNode
  disabled?: boolean
}

export const editLeftTop: itemProps[] = [
  {
    key: 'outlineTree',
    title: '大纲树',
    icon: <PartitionOutlined />,
    children: <OutlineTree />,
  },
  {
    key: 'componentLibrary',
    title: '组件库',
    icon: <ProductOutlined />,
    children: <ComponentLibrary />,
  },
  {
    key: 'dataSource',
    title: '数据源',
    icon: <DatabaseOutlined />,
    children: <DataSource />,
    disabled: true,
  },
  {
    key: 'sourceCode',
    title: '源码',
    icon: <CodeOutlined />,
    children: <SourceCode />,
  },
]

const editLeftBottom = [
  {
    key: 'howUse',
    title: '如何使用',
    icon: <QuestionCircleOutlined />,
  },
]

interface IProps {
  activeObj: {
    active: itemProps
    setActive: (active: itemProps) => void
  }
}

export default memo((props: IProps) => {
  const { activeObj } = props
  const { active, setActive } = activeObj

  // 点击左侧导航栏,callback缓存优化
  const handleItemClick = useCallback(
    (item: itemProps) => {
      setActive(item.key === active.key ? ({ ...active } as itemProps) : item)
    },
    [active],
  )

  return (
    <EditLeftStyled>
      <div className="edit-left-top">
        {editLeftTop.map(item => {
          return (
            <div
              key={item.key}
              className={`edit-left-top-item edit-left-item ${
                active.key === item.key ? 'edit-left-active' : ''
              } ${item.disabled ? 'edit-left-disabled' : ''}`}
              onClick={() => {
                !item.disabled && handleItemClick(item)
              }}
            >
              {item.icon}
              <span className="title">{item.title}</span>
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
              <span className="title">{item.title}</span>
            </div>
          )
        })}
      </div>
    </EditLeftStyled>
  )
})
