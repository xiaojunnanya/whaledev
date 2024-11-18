import { Button, Form, Input, Modal, Radio, Row, Select } from 'antd'
import { memo, useEffect, useState } from 'react'
import { ProjectStyled } from './style'
import { SearchOutlined } from '@ant-design/icons'
import { getProjectType } from '@/service/request/config'
import { createProject, getProjectList } from '@/service/request/project'
import { useGlobal } from '@/stores/global'
import { gloablErrorMessage } from '@/utils/global'

const { Option } = Select

interface FieldType {
  project_name: string
  project_desc?: string
  project_type: 'reception' | 'backstage'
  project_state: 'inProgress' | 'completed' | 'paused' | 'obsolete'
}

interface PropjectType {
  lable: string
  value: string
}

export default memo(() => {
  const [form] = Form.useForm()
  const { setMessage } = useGlobal()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectTypeData, setProjectTypeData] = useState<PropjectType[]>([])
  const [projectData, setProjectData] = useState([])
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')

  useEffect(() => {
    Promise.all([getProjectTypeData(), getProjectData()])
  }, [])

  const getProjectTypeData = async () => {
    // 获取项目类型数据
    const { data } = await getProjectType()
    setProjectTypeData(data)
  }

  const getProjectData = async () => {
    // 获取项目数据
    const { data } = await getProjectList()
    setProjectData(data)
  }

  const onOk = () => {
    form.validateFields().then(async res => {
      // 创建
      if (modalType === 'create') {
        const obj = {
          ...res,
          project_state: 'inProgress',
        }
        const { code, msgType, message } = await createProject(obj)
        if (code === 0 && msgType === 'success') {
          setMessage({ type: 'success', text: message })
          setIsModalOpen(false)
          form.resetFields()
        } else {
          setMessage({
            type: msgType,
            text: message || gloablErrorMessage,
          })
        }
      }
    })
  }

  const onCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }
  console.log(projectData, 'projectData')
  return (
    <ProjectStyled>
      <div className="top">
        <Input
          prefix={<SearchOutlined />}
          placeholder="请输入应用名称"
          allowClear
          // value={searchValue}
          // onChange={e => searchChange(e)}
        />
        <Button
          type="primary"
          onClick={() => {
            setModalType('create')
            setIsModalOpen(true)
          }}
        >
          创建应用
        </Button>
      </div>

      <Modal
        title={modalType === 'create' ? '创建应用' : '编辑应用'}
        open={isModalOpen}
        onOk={onOk}
        cancelText="取消"
        onCancel={onCancel}
        okText={modalType === 'create' ? '创建' : '更新'}
      >
        <Form name="project" labelCol={{ span: 4 }} form={form}>
          <Form.Item<FieldType>
            label="应用名称"
            name="project_name"
            rules={[{ required: true, message: '请输入应用名称' }]}
          >
            <Input maxLength={10} showCount />
          </Form.Item>

          <Form.Item<FieldType> label="应用描述" name="project_desc">
            <Input.TextArea
              maxLength={99}
              showCount
              style={{ height: '100px' }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="project_type"
            label="应用类型"
            rules={[{ required: true, message: '请选择应用类型' }]}
          >
            <Select placeholder="请选择应用类型">
              {projectTypeData.map(item => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.lable}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          {/* {modalType === 'edit' && (
            <Form.Item<FieldType> label="项目状态" name="project_state">
              <Radio.Group>
                {stateData.map(item => {
                  return (
                    <Radio.Button value={item} key={item}>
                      {projectConfig.projectState[item]}
                    </Radio.Button>
                  )
                })}
              </Radio.Group>
            </Form.Item>
          )} */}
        </Form>
      </Modal>
    </ProjectStyled>
  )
})
