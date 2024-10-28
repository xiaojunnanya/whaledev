import { Button, FloatButton, Popover } from 'antd'
import { memo } from 'react'
import { HeaderStyle } from './style'
import { CommentOutlined, MessageOutlined } from '@ant-design/icons'
import wechat from '@/assets/images/png/wechat.png'

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
          <Popover
            content={<img src={wechat} alt="wechat" style={{ width: 200 }} />}
            title="加我微信"
            placement="left"
          >
            <FloatButton icon={<CommentOutlined />} />
          </Popover>
        </FloatButton.Group>
      </>
    </HeaderStyle>
  )
})
