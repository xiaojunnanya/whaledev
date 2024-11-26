import Header from '@/components/Header'
import { getProjectDetail } from '@/service/request/project'
import { useGlobal } from '@/stores/global'
import { lazy, memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectType } from '../ProjectList'
import { ProjectStyled } from './style'
import { LeftOutlined } from '@ant-design/icons'
import { Tabs, TabsProps } from 'antd'

const Rapid = lazy(() => import('./Rapid'))
const Setting = lazy(() => import('./Setting'))
const NotFound = lazy(() => import('@/components/NotFound'))

const items: TabsProps['items'] = [
  {
    key: 'rapid',
    label: '应用组装',
  },
  {
    key: 'settings',
    label: '应用设置',
  },
]

const showContainer = (key: string) => {
  switch (key) {
    case 'rapid':
      return <Rapid />
    case 'settings':
      return <Setting />
    default:
      return <NotFound></NotFound>
  }
}

export default memo(() => {
  const params = useParams()
  const navigate = useNavigate()
  const { setMessage } = useGlobal()
  const { project_id = '', config } = params
  const [projectDetail, setProjectDetail] = useState<ProjectType>(
    {} as ProjectType,
  )
  const [tabsActiveKey, setTabsActiveKey] = useState(config || 'rapid')

  useEffect(() => {
    getProjectDetailById()
  }, [project_id])

  const getProjectDetailById = async () => {
    if (project_id) {
      const { data } = await getProjectDetail(project_id)
      if (data) {
        setProjectDetail(data)
      } else {
        setMessage({
          type: 'error',
          text: '查询项目详情失败，请稍后重试',
        })
      }
    }
  }

  const onChange = (key: string) => {
    setTabsActiveKey(key)
    navigate(`/project/${project_id}/${key}`)
  }

  return (
    <ProjectStyled>
      <Header></Header>
      <div className="projectHeaders">
        <div
          className="project-name"
          onClick={() => {
            navigate('/engineering/project')
          }}
        >
          <LeftOutlined />
          <span className="project-name-text">
            &nbsp;{projectDetail?.project_name}
            {/* 待思考：项目版本问题 */}
            &nbsp;&nbsp;版本：V1.0.0
          </span>
        </div>
        <Tabs
          activeKey={tabsActiveKey}
          items={items}
          centered
          onChange={onChange}
          style={{ marginBottom: 0 }}
        />
      </div>
      <>{showContainer(tabsActiveKey)}</>
    </ProjectStyled>
  )
})
