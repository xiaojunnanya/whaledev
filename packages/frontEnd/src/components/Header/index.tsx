import { memo } from 'react'
import { HeaderStyle } from './style'
import logo from '@/assets/images/favicon.ico'
import { useNavigate } from 'react-router-dom'
import { GithubOutlined } from '@ant-design/icons'

export default memo(() => {
  const naviage = useNavigate()

  return (
    <HeaderStyle>
      <div
        className="logo"
        onClick={() => {
          naviage('/')
        }}
      >
        <img src={logo} alt="鲸灵开发" />
        <h1>鲸灵开发</h1>
      </div>
      <div className="head-right">
        <div>开发文档</div>
        <div>|</div>
        <div
          onClick={() => {
            window.open('https://github.com/xiaojunnanya/whaledev')
          }}
        >
          <GithubOutlined style={{ marginRight: '5px' }} />
          GitHub
        </div>
      </div>
    </HeaderStyle>
  )
})
