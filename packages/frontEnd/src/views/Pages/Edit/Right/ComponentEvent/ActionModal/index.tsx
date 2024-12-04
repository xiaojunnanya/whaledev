import { Form, Modal } from 'antd'
import { memo } from 'react'
import { ActionModalStyled } from './style'

interface IProps {
  showModal: {
    showActionModal: boolean
    setShowActionModal: (showActionModal: boolean) => void
  }
  handleAction: {
    saveAction: any
    setSaveAction: (action: any) => void
  }
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const items = [
  {
    label: '页面',
    key: 'page-nav',
    children: [
      {
        label: '跳转链接',
        key: 'jumpLink',
        render: () => {
          return <div>跳转链接</div>
        },
      },
      {
        label: '刷新页面',
        key: 'reloadPage',
        render: () => {
          return <div>刷新页面</div>
        },
      },
    ],
  },
  {
    label: '弹框',
    key: 'modal-nav',
    children: [
      {
        label: '打开弹框',
        key: 'openModal',
        render: () => {
          return <div>打开弹框</div>
        },
      },
    ],
  },
  {
    label: '测试',
    key: 'text',
    children: [
      {
        label: '访问链接',
        key: 'link',
        render: () => {
          // return  <Link></Link>
        },
      },
      {
        label: '消息提示',
        key: 'message',
        render: () => {
          // return  <Message></Message>
        },
      },
    ],
  },
]

export default memo((props: IProps) => {
  const { showModal, handleAction } = props
  const { showActionModal, setShowActionModal } = showModal
  const { saveAction, setSaveAction } = handleAction

  const handleOk = () => {
    setShowActionModal(false)
  }

  const handleCancel = () => {
    setShowActionModal(false)
  }

  const handleClick = (item: any) => {}

  return (
    <Modal
      title="添加服务编排"
      width={800}
      open={showActionModal}
      okText="确认"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ActionModalStyled>
        <div className="menuAction">
          <ul>
            {items.map((item: any) => {
              return (
                <li key={item.key} className="category">
                  <span className="navTitle">{item.label}</span>
                  <ul>
                    {item.children.map((child: any) => {
                      return (
                        <li
                          key={child.key}
                          className={`subItem ${
                            saveAction?.key === child.key ? 'checked' : ''
                          }`}
                          onClick={() => handleClick(child)}
                        >
                          <span>{child.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="content">
          {saveAction?.key}
          {/* <Form form={form} {...formLayout}>
            {action?.key && action?.key !== 'none' ? (
              <>{renderEle(action.key)}</>
            ) : (
              <div className="content-text">请选择要执行的动作</div>
            )}
          </Form> */}
        </div>
      </ActionModalStyled>
    </Modal>
  )
})
