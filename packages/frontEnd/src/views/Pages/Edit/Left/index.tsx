import { lazy, memo, ReactNode, useState } from 'react'
import { LeftStyled } from './style'
import affixImg from '@/assets/images/svg/affix.svg'
import noaffixImg from '@/assets/images/svg/notAffix.svg'

import {
  CloseOutlined,
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

const editLeftTop: itemProps[] = [
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

export default memo(() => {
  const [active, setActive] = useState<itemProps>({} as itemProps)
  // 是否固定
  const [isAffix, setIsAffix] = useState(false)

  return (
    <>
      <LeftStyled className="edit-left">
        <div
          className="edit-left-side"
          style={{ display: active.key ? 'block' : 'none' }}
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
          <>
            {editLeftTop.filter(item => item.key === active.key)[0]?.children}
          </>
        </div>

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
    </>
  )
})
