import { memo } from 'react'
import { HeaderStyle } from './style'
import { ArrowRightOutlined } from '@ant-design/icons'
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
      </HeaderStyle>
    </>
  )
})
