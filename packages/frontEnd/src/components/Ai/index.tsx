import { memo } from 'react'
import { AiStyled } from './style'
import AiContent from './AiContent'
import { CloseOutlined } from '@ant-design/icons'

interface IProps {
  setOpenAiModal: (open: boolean) => void
}

export default memo((props: IProps) => {
  const { setOpenAiModal } = props

  return (
    <AiStyled>
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
