import { FloatButton, Popover } from 'antd'
import { memo } from 'react'
import { HeaderStyle } from './style'
import {
  ArrowRightOutlined,
  CommentOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import wechat from '@/assets/images/png/wechat.png'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'

export default memo(() => {
  const navigate = useNavigate()

  const handleClick = () => {
    const token = localStorage.getItem('token')
    navigate(token ? '/engineering/project' : '/login')
  }

  return (
    <>
      <Header></Header>
      <HeaderStyle>
        <div className="middle">
          <div className="container">
            <div className="m1">用 编排 创造页面</div>
            <div className="m2">让搭建更简单，让开发更高效</div>
            <div className="m3" onClick={handleClick}>
              <span className="startBtn">快速开始</span>
              <ArrowRightOutlined />
            </div>
          </div>
        </div>

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
    </>
  )
})
