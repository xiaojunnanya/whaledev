import { memo, useEffect, useState } from 'react'
import { RapidStyled } from './style'
import { Button, Dropdown, Form, Input, Modal, Select } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
  SignatureOutlined,
} from '@ant-design/icons'
import type { MenuProps, SelectProps } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobal } from '@/stores/global'

import {
  createPage,
  deletePage,
  getPagesList,
  updatePage,
} from '@/service/request/pages'
import { gloablErrorMessage } from '@/utils/global'

interface pageDataType {
  id: number
  page_id: string
  page_name: string
  page_type: string
}

const settingItems: MenuProps['items'] = [
  {
    key: '1',
    label: <span> 编辑 </span>,
    icon: <EditOutlined />,
    style: { fontSize: '12px' },
  },
  {
    key: '2',
    label: <span> 重命名 </span>,
    icon: <SignatureOutlined />,
    style: { fontSize: '12px' },
  },
  {
    key: '3',
    label: <span> 复制 </span>,
    icon: <CopyOutlined />,
    style: { fontSize: '12px' },
  },
  {
    key: '4',
    label: <span> 删除 </span>,
    icon: <DeleteOutlined />,
    style: { fontSize: '12px' },
  },
]

const pageItems: SelectProps['options'] = [
  {
    label: '自定义页面',
    value: 'custom',
  },
  {
    label: '模板',
    value: 'template',
    disabled: true,
  },
  {
    label: '自定义流程',
    value: 'flow',
    disabled: true,
  },
]

export default memo(() => {
  const params = useParams()
  const { project_id = '', page_id = '' } = params
  const { setMessage } = useGlobal()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [pageActive, setPageActive] = useState(page_id)
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [pageData, setPageData] = useState<pageDataType[]>([])
  const [editPage, setEditPage] = useState<pageDataType>({} as pageDataType)
  const [deleteModal, contextDeleteHolder] = Modal.useModal()

  useEffect(() => {
    project_id && getPagesData()
  }, [project_id])

  const getPagesData = async () => {
    const { data } = await getPagesList(project_id)
    setPageData(data)
  }

  const handlePageClick = (page_id: string) => {
    setPageActive(page_id)
    navigate(`/project/${project_id}/rapid/page/${page_id}`)
  }

  const onCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const onOk = () => {
    form.validateFields().then(async res => {
      res = {
        ...res,
        project_id,
      }
      const { data, message } =
        modalType === 'create'
          ? await createPage(res)
          : await updatePage({
              page_id: editPage?.page_id,
              page_name: res.page_name,
            })

      if (!data) {
        getPagesData()
        setMessage({ type: 'success', text: message })
        setIsModalOpen(false)
        form.resetFields()
      } else {
        setMessage({ type: 'error', text: message || gloablErrorMessage })
      }
    })
  }

  const handleClick = async (e: any, item: pageDataType) => {
    e.domEvent.stopPropagation()

    setEditPage(item)

    switch (e.key) {
      case '1':
        navigate(`/project/${project_id}/page/${item.page_id}/edit`)
        break
      case '2':
        setModalType('edit')
        setIsModalOpen(true)
        form.setFieldsValue(item)
        break
      case '4':
        await deleteModal.confirm({
          title: '提示',
          content: (
            <>
              确定要删除页面{' '}
              <span style={{ color: 'red' }}>{item.page_name}</span> 吗？
            </>
          ),
          onOk: async () => {
            const { data, message } = await deletePage(item.page_id)
            if (!data) {
              setPageActive('')
              getPagesData()
              setMessage({ type: 'success', text: message })
            } else {
              setMessage({ type: 'error', text: message || gloablErrorMessage })
            }
          },
        })
        break
      default:
        break
    }
  }

  return (
    <RapidStyled>
      <div className="page-select">
        <div className="add">
          <div className="add-text">广告位招租</div>
          <Button
            type="primary"
            size="small"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true)
              setModalType('create')
            }}
          />
        </div>
        <div className="page">
          {pageData.map(item => {
            return (
              <div
                className={`page-item ${
                  item.page_id === pageActive ? 'page-active' : ''
                }`}
                onClick={() => handlePageClick(item.page_id)}
                key={item.id}
              >
                <div className="page-item-name">
                  <span>{item.page_name}</span>
                </div>
                <Dropdown
                  menu={{
                    items: settingItems,
                    onClick: e => {
                      handleClick(e, item)
                    },
                  }}
                  arrow={{ pointAtCenter: true }}
                >
                  <SettingOutlined className="settingOutlined" />
                </Dropdown>
              </div>
            )
          })}
        </div>
      </div>

      <div className="page-preview">
        {pageActive ? <div>{pageActive}</div> : <div>请选择页面</div>}
      </div>

      <Modal
        title={modalType === 'create' ? '新建页面' : '编辑页面'}
        open={isModalOpen}
        onOk={onOk}
        cancelText="取消"
        onCancel={onCancel}
        okText={modalType === 'create' ? '创建' : '更新'}
      >
        <Form name="project" labelCol={{ span: 4 }} form={form}>
          <Form.Item
            label="页面名称"
            name="page_name"
            rules={[{ required: true, message: '请输入页面名称' }]}
          >
            <Input maxLength={10} showCount placeholder="请输入页面名称" />
          </Form.Item>

          <Form.Item
            name="page_type"
            label="页面模式"
            rules={[{ required: true, message: '请选择页面模式' }]}
          >
            <Select
              placeholder="请选择页面模式"
              disabled={modalType === 'edit'}
              options={pageItems}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>

      {contextDeleteHolder}
    </RapidStyled>
  )
})
