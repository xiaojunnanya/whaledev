import { Button, FloatButton } from 'antd'
import { memo } from 'react'
import { HeaderStyle } from './style'
import { CommentOutlined, MessageOutlined } from '@ant-design/icons'

export default memo(() => {
  return (
    <HeaderStyle>
      <Button
        onClick={() => {
          window.open('http://localhost:4173/')
        }}
      >
        开发文档
      </Button>
      <div>首页中间还在思考中....</div>
      <Button type="primary">快速开始</Button>

      <>
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{ insetInlineEnd: 25 }}
          icon={<MessageOutlined />}
        >
          <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
      </>
    </HeaderStyle>
  )
})
