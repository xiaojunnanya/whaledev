import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Tag,
} from 'antd'
import { memo, useEffect, useState } from 'react'
import { ProjectStyled } from './style'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { getProjectStatus, getProjectType } from '@/service/request/config'
import {
  createProject,
  deleteProject,
  getProjectList,
  updateProject,
} from '@/service/request/project'
import { useGlobal } from '@/stores/global'
import { gloablErrorMessage } from '@/utils/global'
import Container from '@/components/Container'
const { Meta } = Card
const { Option } = Select

interface FieldType {
  project_name: string
  project_desc?: string
  project_type: 'reception' | 'backstage'
  project_state: 'inProgress' | 'completed' | 'paused' | 'obsolete'
}

interface PropjectTypeType {
  lable: string
  value: string
  color?: string
}

interface ProjectType {
  id: number
  project_id: string
  project_name: string
  project_desc?: string
  project_type: string
  project_state: string
}

const optionsWithScene = [
  { label: '个人', value: 'slef' },
  { label: '分享', value: 'share' },
]
// 遗留的问题：分享功能、复制功能、搜索功能、分页功能、页面加载
export default memo(() => {
  const [form] = Form.useForm()
  const { setMessage } = useGlobal()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectTypeData, setProjectTypeData] = useState<PropjectTypeType[]>([])
  const [projectStateData, setProjectStateData] = useState<PropjectTypeType[]>(
    [],
  )
  const [radioValue, setRadioValue] = useState('slef')
  const [projectData, setProjectData] = useState<ProjectType[]>([])
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')
  const [editId, setEditId] = useState<number>(-1)
  const [cardLoading, setCardLoading] = useState<boolean>(false)

  useEffect(() => {
    setCardLoading(true)
    Promise.all([getProjectTypeData(), getProjectData(), getProjectState()])
  }, [])

  const getProjectTypeData = async () => {
    // 获取项目类型数据
    const { data } = await getProjectType()
    setProjectTypeData(data)
  }

  const getProjectState = async () => {
    const { data } = await getProjectStatus()
    setProjectStateData(data)
  }

  const getProjectData = async () => {
    // 获取项目数据
    const { data } = await getProjectList()
    setProjectData(data)
    setCardLoading(false)
  }

  const onOk = () => {
    form.validateFields().then(async res => {
      const obj = {
        ...res,
        project_state: 'inProgress',
      }
      const { code, msgType, message } =
        modalType === 'create'
          ? await createProject(obj)
          : await updateProject(editId, res)
      if (code === 0 && msgType === 'success') {
        getProjectData()
        setMessage({ type: 'success', text: message })
        setIsModalOpen(false)
        form.resetFields()
      } else {
        setMessage({
          type: msgType,
          text: message || gloablErrorMessage,
        })
      }
    })
  }

  const editModal = (e: any, item: any) => {
    e.stopPropagation()
    setEditId(item.id)
    setModalType('edit')
    form.setFieldsValue(item)
    setIsModalOpen(true)
  }

  const onCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const deleteOneProject = async (e: any, id: number) => {
    e.stopPropagation()
    const { code, msgType, message } = await deleteProject(id)
    if (code === 0 && msgType === 'success') {
      getProjectData()
      setMessage({ type: 'success', text: message })
    } else {
      setMessage({
        type: msgType,
        text: message || gloablErrorMessage,
      })
    }
  }

  const onChangeRadio = (e: any) => {
    setRadioValue(e.target.value)
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
        <Radio.Group
          options={optionsWithScene}
          onChange={onChangeRadio}
          value={radioValue}
          optionType="button"
          buttonStyle="solid"
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

      <Container>
        <div className="content">
          <Row gutter={[16, 16]}>
            {projectData.map(item => {
              return (
                <Col span={6} key={item.project_id}>
                  <Card
                    actions={[
                      <CopyOutlined
                        key="copy"
                        onClick={e => {
                          e.stopPropagation()
                        }}
                      />,
                      <EditOutlined
                        key="edit"
                        onClick={e => {
                          editModal(e, item)
                        }}
                      />,
                      <Popconfirm
                        title="提示"
                        description="确定要删除该项目吗"
                        onConfirm={e => {
                          deleteOneProject(e, item.id)
                        }}
                        onCancel={e => {
                          e?.stopPropagation()
                        }}
                        okText="确定"
                        cancelText="取消"
                      >
                        <DeleteOutlined
                          key="delete"
                          onClick={e => {
                            e.stopPropagation()
                          }}
                        />
                      </Popconfirm>,
                    ]}
                    hoverable
                    // onClick={() =>{ goProjectDetail(item.projectId)}}
                    loading={cardLoading}
                  >
                    <Meta
                      avatar={
                        <Avatar
                          src={'http://www.xiaojunnan.cn/img/logo.webp'}
                        />
                      }
                      title={item.project_name}
                      description={
                        <div className="otherinfo">
                          <div>{item.project_desc}</div>
                          <div className="typestate">
                            <span className="type">
                              {projectTypeData.map(i => {
                                if (i.value === item.project_type) {
                                  return i.lable
                                }
                              })}
                            </span>
                            <>
                              {projectStateData.map(i => {
                                if (i.value === item.project_state) {
                                  return <Tag color={i.color}>{i.lable}</Tag>
                                }
                              })}
                            </>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>
      </Container>

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

          {modalType === 'edit' && (
            <Form.Item<FieldType> label="项目状态" name="project_state">
              <Radio.Group>
                {projectStateData.map(item => {
                  return (
                    <Radio.Button value={item.value} key={item.value}>
                      {item.lable}
                    </Radio.Button>
                  )
                })}
              </Radio.Group>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </ProjectStyled>
  )
})
