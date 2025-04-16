import { memo } from 'react'
import { AiStyled } from './style'
import AiContent from './AiContent'
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

const content = (
  <div>
    <p>1、大模型返回JSON字段，确认使用功能只能在编辑页面使用</p>
  </div>
)

interface IProps {
  setOpenAiModal: (open: boolean) => void
  openAiModal: boolean
}

export default memo((props: IProps) => {
  const { setOpenAiModal, openAiModal } = props

  return (
    <AiStyled openAiModal={openAiModal}>
      <div className="ai_header">
        <div className="ai_header_logo">
          <span>灵析AI</span>
          <Popover content={content} title="灵析AI使用说明" placement="bottom">
            <QuestionCircleOutlined />
          </Popover>
        </div>
        <CloseOutlined
          className="ai_header_close"
          onClick={() => setOpenAiModal(false)}
        />
      </div>
      <AiContent></AiContent>
    </AiStyled>
  )
})
