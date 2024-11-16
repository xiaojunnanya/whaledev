import { Button, Form, Input, Modal, Radio, Row, Select } from 'antd'
import { memo, useEffect, useState } from 'react'
import { ProjectStyled } from './style'
import { SearchOutlined } from '@ant-design/icons'
import { getProjectType } from '@/service/request/config'

const { Option } = Select

interface FieldType {
  projectName: string
  projectDesc?: string
  projectType: string
  projectState: 'inProgress' | 'completed' | 'paused' | 'obsolete'
}

interface PropjectType {
  lable: string
  value: string
}

export default memo(() => {
  const [form] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectTypeData, setProjectTypeData] = useState<PropjectType[]>([])
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')

  useEffect(() => {
    getProjectTypeData()
  }, [])

  const getProjectTypeData = async () => {
    // 获取项目类型数据
    const { data } = await getProjectType()
    setProjectTypeData(data.data)
  }

  const onOk = () => {}

  const onCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

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
    </ProjectStyled>
  )
})
