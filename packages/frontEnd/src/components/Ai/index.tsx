import { memo } from 'react'
import { AiStyled } from './style'
import AiContent from './AiContent'
import { CloseOutlined } from '@ant-design/icons'

interface IProps {
  setOpenAiModal: (open: boolean) => void
  openAiModal: boolean
}

export default memo((props: IProps) => {
  const { setOpenAiModal, openAiModal } = props

  return (
    <AiStyled openAiModal={openAiModal}>
      <div className="ai_header">
        <div className="ai_header_logo">灵析AI</div>
        <CloseOutlined
          className="ai_header_close"
          onClick={() => setOpenAiModal(false)}
        />
      </div>
      <AiContent></AiContent>
    </AiStyled>
  )
})
