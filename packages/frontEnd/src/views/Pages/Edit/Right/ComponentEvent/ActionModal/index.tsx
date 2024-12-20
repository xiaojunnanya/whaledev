import { Form, Modal } from 'antd'
import { memo, useEffect, useState } from 'react'
import { ActionModalStyled } from './style'
import { allActions, itemsActions, itemsChildType } from '../Actions'
import Describe from '../Actions/Describe'
import { NodeType } from '../ServiceLayout'
import { cloneDeep } from 'lodash-es'
import { replaceNodeById } from '@/utils/actions'

interface IProps {
  showModal: {
    showActionModal: boolean
    setShowActionModal: (showActionModal: boolean) => void
  }
  editNode: NodeType
  list: NodeType[]
  setList: (list: any) => void
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

export default memo((props: IProps) => {
  const [form] = Form.useForm()
  const { showModal, editNode, setList, list } = props

  const { showActionModal, setShowActionModal } = showModal
  const [saveAction, setSaveAction] = useState<itemsChildType>(
    {} as itemsChildType,
  )

  useEffect(() => {
    const obj = allActions.filter(
      item => item.key === editNode?.config?.actionType,
    )[0]
    setSaveAction(obj)
  }, [editNode])

  const handleOk = async () => {
    const res = await form.validateFields()
    console.log(res, 'res')
    const obj = {
      ...res,
      actionType: saveAction?.key || '',
      actioneName: saveAction?.label || '编排节点',
    }

    const newObj = {
      ...editNode,
      config: obj,
      content: obj?.actioneName,
    }

    const newList = cloneDeep(list)

    const newData = replaceNodeById(newList, editNode.id, newObj)
    setList(newData)

    setShowActionModal(false)
  }

  const handleCancel = () => {
    setShowActionModal(false)
  }

  const handleClick = (item: itemsChildType) => {
    setSaveAction(item)
  }

  return (
    <Modal
      title="添加服务编排"
      width={800}
      open={showActionModal}
      okText="确认"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
      className="actonModal"
    >
      <ActionModalStyled>
        <div className="menuAction">
          <ul>
            {itemsActions.map((item: any) => {
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
        <div className="actionModalContent">
          <Form {...formLayout} form={form} initialValues={editNode?.config}>
            {saveAction?.key && saveAction?.key !== 'none' ? (
              <>
                <Describe>{saveAction?.describe}</Describe>
                {saveAction.render(form)}
              </>
            ) : (
              <div className="content-text">请选择要执行的动作</div>
            )}
          </Form>
        </div>
      </ActionModalStyled>
    </Modal>
  )
})
