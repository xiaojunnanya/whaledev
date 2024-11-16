import { memo } from 'react'
import { HeaderStyle } from './style'
import logo from '@/assets/images/favicon.ico'
import { useNavigate } from 'react-router-dom'
import { GithubOutlined } from '@ant-design/icons'

interface IProps {
  children?: React.ReactNode
}

export default memo((props: IProps) => {
  const { children } = props

  const naviage = useNavigate()

  return (
    <HeaderStyle>
      <div className="head-container">
        <div
          className="logo"
          onClick={() => {
            naviage('/')
          }}
        >
          <img src={logo} alt="鲸灵开发" />
          <h1>WhaleDev 鲸灵开发</h1>
        </div>

        <div className="head-center">{children && children}</div>

        <div className="head-right">
          <div
            onClick={() => {
              window.open('http://localhost:4173/')
            }}
          >
            开发文档
          </div>
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
      </div>
    </HeaderStyle>
  )
})
