import Header from '@/components/Header'
import { getProjectDetail } from '@/service/request/project'
import { useGlobal } from '@/stores/global'
import { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectType } from '../ProjectList'
import { ProjectStyled } from './style'
import { LeftOutlined } from '@ant-design/icons'
import { Tabs, TabsProps } from 'antd'

export default memo(() => {
  const params = useParams()
  const navigate = useNavigate()
  const { setMessage } = useGlobal()
  const { projectRouterId, config } = params
  const [projectDetail, setProjectDetail] = useState<ProjectType>(
    {} as ProjectType,
  )
  const [tabsActiveKey, setTabsActiveKey] = useState(config || 'rapid')

  const items: TabsProps['items'] = [
    {
      key: 'rapid',
      label: '应用组装',
      // children: <RapidPages />,
    },
    {
      key: 'settings',
      label: '应用设置',
      // children: <SettingPages />,
    },
  ]

  useEffect(() => {
    getProjectDetailById()
  }, [projectRouterId])

  const getProjectDetailById = async () => {
    if (projectRouterId) {
      const { data, code, msgType } = await getProjectDetail(projectRouterId)
      if (code === 0 && msgType === 'success') {
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
    // navigate(`/project/${projectId}/${key}`)
  }

  return (
    <ProjectStyled>
      <Header>
        <div className="headers">
          <div
            className="project-name"
            onClick={() => {
              navigate('/engineering/project')
            }}
          >
            <LeftOutlined />
            <span className="project-name-text">
              &nbsp;{projectDetail.project_name}
            </span>
          </div>
          <Tabs
            activeKey={tabsActiveKey}
            items={items}
            centered
            onChange={onChange}
            style={{ marginBottom: 0 }}
          />
          <div style={{ visibility: 'hidden' }}>1</div>
        </div>
      </Header>
    </ProjectStyled>
  )
})
