import { Button, Form, Input, Modal, Radio, Row, Select, Tabs } from 'antd'
import { memo, useState } from 'react'
import { ProjectStyled } from './style'
import {
  CodepenOutlined,
  ProjectOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import Header from '@/components/Header'

interface FieldType {
  projectName: string
  projectDesc?: string
  projectType: string
  projectState: 'inProgress' | 'completed' | 'paused' | 'obsolete'
}

export default memo(() => {
  const [form] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')

  const onOk = () => {}

  const onCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  return (
    <ProjectStyled>
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
            name="projectName"
            rules={[{ required: true, message: '请输入应用名称' }]}
          >
            <Input maxLength={10} showCount />
          </Form.Item>

          <Form.Item<FieldType> label="应用描述" name="projectDesc">
            <Input.TextArea
              maxLength={99}
              showCount
              style={{ height: '100px' }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="projectType"
            label="应用类型"
            rules={[{ required: true, message: '请选择应用类型' }]}
          >
            <Select placeholder="请选择应用类型">
              {/* {
                typeData.map(item =>{
                  return <Option value={item} key={item}>{projectConfig.projectType[item]}</Option>
                })
              } */}
            </Select>
          </Form.Item>

          {/* {
            modalType === 'edit' && (
              <Form.Item<FieldType> label="项目状态" name="projectState">
                <Radio.Group>
                  {
                    stateData.map(item =>{
                      return <Radio.Button value={item} key={item}>{projectConfig.projectState[item]}</Radio.Button>
                    })
                  }
                </Radio.Group>
              </Form.Item>
            )
          } */}
        </Form>
      </Modal>

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

      <div className="content">
        <Row gutter={[16, 16]}>
          {/* {
            listData.map(item =>{
              return (
                <Col span={6} key={item.id}>
                  <Card
                    actions={[
                      <CopyOutlined key="copy" onClick={ (e)=> {e.stopPropagation()} }/>,
                      <EditOutlined key="edit" onClick={ (e)=> {editModal(e, item)} } />,
                      <Popconfirm
                        title="提示"
                        description="确定要删除该项目吗"
                        onConfirm={(e)=>{deleteOneProject(e, item.id)}}
                        onCancel={ (e)=> {e?.stopPropagation()} }
                        okText="确定"
                        cancelText="取消"
                      >
                        <DeleteOutlined key="delete" onClick={ (e)=> {e.stopPropagation()} }/>
                      </Popconfirm>,
                    ]}
                    hoverable
                    onClick={() =>{ goProjectDetail(item.projectId)}}
                    loading={cardLoading}
                  >
                    <Meta
                      avatar={<Avatar src={getImageShow(item.projectIcon)} />}
                      title={item.projectName}
                      description={
                        <div className='otherinfo'>
                          <div>{item.projectDesc}</div>
                          <div className='typestate'>
                            <span className='type'>{projectConfig.projectType[item.projectType]}</span>
                            <Tag color={projectConfig.projectStateColor[item.projectState]}>{projectConfig.projectState[item.projectState]}</Tag>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              )
            })
          } */}
        </Row>
      </div>

      {/* <div className='bottom'>
        <Pagination showQuickJumper current={pageConfig.current} showTotal={(total) => `共 ${total} 条`}
        defaultPageSize={8} total={pageConfig.total} showSizeChanger={false}
        onChange={pageChange}/>
      </div> */}
    </ProjectStyled>
  )
})
