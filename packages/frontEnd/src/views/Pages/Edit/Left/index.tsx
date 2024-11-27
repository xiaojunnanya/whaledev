import { lazy, memo, ReactNode } from 'react'
import { EditLeftStyled } from './style'

import {
  CodeOutlined,
  DatabaseOutlined,
  PartitionOutlined,
  ProductOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'

const OutlineTree = lazy(() => import('./OutlineTree'))
const ComponentLibrary = lazy(() => import('./ComponentLibrary'))
const DataSource = lazy(() => import('./DataSource'))
const SourceCode = lazy(() => import('./SourceCode'))

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

  return (
    <EditLeftStyled>
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
    </EditLeftStyled>
  )
})
