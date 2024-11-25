import Header from '@/components/Header'
import {
  AppstoreAddOutlined,
  ProductOutlined,
  ProjectOutlined,
} from '@ant-design/icons'
import { Tabs } from 'antd'
import { lazy, memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const NotFound = lazy(() => import('@/components/NotFound/index'))
const Project = lazy(() => import('@/views/ProjectList/index'))
const Componentlibrary = lazy(() => import('@/views/Componentlibrary/index'))
const Template = lazy(() => import('@/views/Template/index'))

const tabsItems = [
  {
    label: '项目列表',
    key: 'project',
    icon: <ProjectOutlined />,
  },
  {
    label: '组件市场',
    key: 'componentlibrary',
    icon: <ProductOutlined />,
  },
  {
    label: '模版市场',
    key: 'template',
    icon: <AppstoreAddOutlined />,
  },
]

export default memo(() => {
  const params = useParams()
  const navigate = useNavigate()
  const { name = '' } = params
  const [avtiveKey, setActiveKey] = useState('project')
  const [showContent, setShowContent] = useState(<Project />)

  useEffect(() => {
    name ? setActiveKey(name) : navigate('/engineering/project')
  }, [name])

  useEffect(() => {
    switch (avtiveKey) {
      case 'project':
        setShowContent(<Project />)
        break
      case 'componentlibrary':
        setShowContent(<Componentlibrary />)
        break
      case 'template':
        setShowContent(<Template />)
        break
      default:
        setShowContent(<NotFound />)
        break
    }
  }, [avtiveKey])

  const handleChange = (key: string) => {
    navigate(`/engineering/${key}`)
    setActiveKey(key)
  }

  return (
    <>
      <Header>
        <Tabs
          activeKey={avtiveKey}
          centered
          items={tabsItems}
          onChange={handleChange}
        />
      </Header>
      {showContent}
    </>
  )
})
