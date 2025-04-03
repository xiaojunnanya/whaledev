import AiContent from '@/components/Ai/AiContent'
import { Conversations, ConversationsProps } from '@ant-design/x'
import { GetProp, theme } from 'antd'
import { memo } from 'react'
import { AiViewStyled } from './style'

const items: GetProp<ConversationsProps, 'items'> = Array.from({
  length: 4,
}).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`,
  disabled: index === 3,
  group: index === 3 ? 'Group2' : 'Group1',
}))

export default memo(() => {
  const { token } = theme.useToken()

  return (
    <AiViewStyled>
      <Conversations
        items={items}
        defaultActiveKey="item1"
        style={{
          width: 256,
          background: token.colorBgContainer,
          borderRadius: token.borderRadius,
        }}
        groupable
      />
      <AiContent></AiContent>
    </AiViewStyled>
  )
})
