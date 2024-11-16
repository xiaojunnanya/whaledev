import Header from '@/components/Header'
import { CodepenOutlined, ProjectOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import { lazy, memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const NotFound = lazy(() => import('@/components/NotFound/index'))
const Project = lazy(() => import('@/views/Project/index'))
const Componentlibrary = lazy(() => import('@/views/Componentlibrary/index'))

export default memo(() => {
  const params = useParams()
  const navigate = useNavigate()
  const { name = '' } = params
  const [avtiveKey, setActiveKey] = useState('project')
  const [showContent, setShowContent] = useState(<Project />)

  useEffect(() => {
    setActiveKey(name)
  }, [name])

  useEffect(() => {
    switch (avtiveKey) {
      case 'project':
        setShowContent(<Project />)
        // 项目列表
        break
      case 'componentlibrary':
        setShowContent(<Componentlibrary />)
        // 组件库
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
          items={[
            {
              label: '项目列表',
              key: 'project',
              icon: <ProjectOutlined />,
            },
            {
              label: '组件库',
              key: 'componentlibrary',
              icon: <CodepenOutlined />,
            },
          ]}
          onChange={handleChange}
        />
      </Header>
      {showContent}
    </>
  )
})
