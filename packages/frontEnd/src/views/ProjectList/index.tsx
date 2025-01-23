import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Radio,
  Select,
  Tag,
} from 'antd'
import { memo, useEffect, useState } from 'react'
import { ProjectListStyled } from './style'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { getProjectStatus, getProjectType } from '@/service/request/config'
import {
  createProject,
  deleteProject,
  getProjectList,
  searchProject,
  updateProject,
} from '@/service/request/project'
import { useGlobal } from '@/stores/global'
import { gloablErrorMessage } from '@/utils/global'
import ContainerVh from '@/components/ContainerVh'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash-es'
import Masonry from 'react-masonry-css'
import { SELFWEBURL } from '@/assets/defaultData'
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

export interface ProjectType {
  id: number
  project_id: string
  project_name: string
  project_desc?: string
  project_type: string
  project_state: string
}

const defaultProjectData = [{}] as ProjectType[]

const optionsWithScene = [
  { label: '个人', value: 'slef' },
  { label: '分享', value: 'share' },
]

const breakpointColumnsObj = {
  default: 4, // 默认列数
  1200: 3, // 当宽度小于 1100px 时显示 3 列
  880: 2, // 当宽度小于 768px 时显示 2 列
  580: 1, // 当宽度小于 480px 时显示 1 列
}

// 遗留的问题：分享功能、复制功能、类型部分
export default memo(() => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { setMessage } = useGlobal()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectTypeData, setProjectTypeData] = useState<PropjectTypeType[]>([])
  const [projectStateData, setProjectStateData] = useState<PropjectTypeType[]>(
    [],
  )
  const [radioValue, setRadioValue] = useState('slef')
  // 项目数目
  const [projectData, setProjectData] =
    useState<ProjectType[]>(defaultProjectData)
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')
  // 当前编辑的卡片id
  const [editId, setEditId] = useState<string>('')
  // 页面加载
  const [cardLoading, setCardLoading] = useState<boolean>(false)
  // 总页码
  const [totalPage, setTotalPage] = useState<number>(1)
  // 当前分页
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    setCardLoading(true)
    Promise.allSettled([
      getProjectTypeData(),
      getProjectData(currentPage),
      getProjectState(),
    ])
  }, [])

  // 获取项目类型数据
  const getProjectTypeData = async () => {
    const { data } = await getProjectType()
    setProjectTypeData(data)
  }

  // 获取项目类型状态
  const getProjectState = async () => {
    const { data } = await getProjectStatus()
    setProjectStateData(data)
  }

  const searchHandleProject = async (keyword: string, page: number) => {
    const { data } = await searchProject(keyword, page)
    setProjectData(data.data)
    setTotalPage(data.total)
  }

  // 获取项目数据
  const getProjectData = async (page: number) => {
    const { data } = await getProjectList(page)
    setProjectData(data.data)
    setTotalPage(data.total)
    setCardLoading(false)
  }

  const onOk = () => {
    form.validateFields().then(async res => {
      const obj = {
        ...res,
        project_state: 'inProgress',
      }
      const { msgType, message } =
        modalType === 'create'
          ? await createProject(obj)
          : await updateProject(editId, res)
      if (msgType === 'success') {
        getProjectData(currentPage)
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
    setEditId(item.project_id)
    setModalType('edit')
    form.setFieldsValue(item)
    setIsModalOpen(true)
  }

  const onCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const deleteOneProject = async (e: any, id: string) => {
    e.stopPropagation()
    const { msgType, message } = await deleteProject(id)
    if (msgType === 'success') {
      getProjectData(currentPage)
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

  const onchangePage = (page: number) => {
    setCardLoading(true)
    setCurrentPage(page)
    getProjectData(page)
  }

  const searchChange = debounce((keyname: string) => {
    setCurrentPage(1)
    if (!keyname) {
      getProjectData(currentPage)
    } else {
      searchHandleProject(keyname, 1)
    }
  }, 500)

  const handleClickCard = (id: string) => {
    navigate(`/project/${id}/rapid`)
  }

  return (
    <ProjectListStyled>
      <div className="projectListTop">
        <Input
          prefix={<SearchOutlined />}
          placeholder="请输入应用名称"
          allowClear
          onChange={e => {
            searchChange(e.target.value)
          }}
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

      <ContainerVh isLoading={cardLoading} height={150} isSetHeight={true}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="content"
          columnClassName="cardColumn"
        >
          {projectData.map((item, index) => {
            return (
              <div className="cardItem" key={item.project_id || index}>
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
                    <ShareAltOutlined
                      key="share"
                      onClick={e => {
                        e.stopPropagation()
                      }}
                    />,
                    <Popconfirm
                      title="提示"
                      description="确定要删除该项目吗"
                      onConfirm={e => {
                        deleteOneProject(e, item.project_id)
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
                  onClick={() => {
                    handleClickCard(item.project_id)
                  }}
                >
                  <Meta
                    avatar={<Avatar src={SELFWEBURL.profile} />}
                    title={item.project_name}
                    description={
                      <div className="otherinfo">
                        <div>{item.project_desc}</div>
                        <div className="typestate">
                          <>
                            {projectTypeData.map(i => {
                              if (i.value === item.project_type) {
                                return (
                                  <span className="type" key={i.value}>
                                    {i.lable}
                                  </span>
                                )
                              }
                            })}
                          </>
                          <>
                            {projectStateData.map(i => {
                              if (i.value === item.project_state) {
                                return (
                                  <Tag color={i.color} key={i.value}>
                                    {i.lable}
                                  </Tag>
                                )
                              }
                            })}
                          </>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </div>
            )
          })}
        </Masonry>
      </ContainerVh>

      <Pagination
        total={totalPage}
        showQuickJumper
        showSizeChanger={false}
        showTotal={total => `共 ${total} 条`}
        defaultPageSize={8}
        current={currentPage}
        align="end"
        onChange={onchangePage}
      />

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

          {/* 遗留的问题：后续思考这个项目类型是否可以修改 */}
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
    </ProjectListStyled>
  )
})
