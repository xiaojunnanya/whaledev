import { memo, useEffect, useState } from 'react'
import { HeaderStyle } from './style'
import logo from '@/assets/images/favicon.ico'
import { useNavigate } from 'react-router-dom'
import { GithubOutlined } from '@ant-design/icons'
import { getUserInfoData } from '@/service/request/user'
import { getShowImg } from '@/service/request/config'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { SELFWEBURL } from '@/assets/defaultData'

interface IProps {
  children?: React.ReactNode
}

interface IUserInfo {
  user_id: string
  username: string
  avatar: string
  status: 0 | 1
}

export default memo((props: IProps) => {
  const { children } = props
  const localToken = window.localStorage.getItem('TOKEN')
  const localUserInfo = window.localStorage.getItem('USER_INFO') || '{}'
  const naviage = useNavigate()

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localUserInfo) as IUserInfo,
  )

  const [token, setToken] = useState<string | null>(localToken)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          onClick={() => {
            naviage('/userinfo')
          }}
        >
          个人中心
        </div>
      ),
    },
    {
      key: '-1',
      label: (
        <div
          onClick={() => {
            localStorage.clear()
            setUserInfo({} as IUserInfo)
            naviage('/')
          }}
        >
          退出登录
        </div>
      ),
    },
  ]

  useEffect(() => {
    token && getUserInfo()
  }, [token])

  useEffect(() => {
    setToken(localToken)
  }, [localToken])

  const getUserInfo = async () => {
    const { data } = await getUserInfoData()
    setUserInfo(data)
  }

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
              window.open(SELFWEBURL.whaleDocs)
            }}
            className="docs"
          >
            开发文档
          </div>
          <div>|</div>
          <div
            onClick={() => {
              window.open(SELFWEBURL.projectGithub)
            }}
            className="github"
          >
            <GithubOutlined />
          </div>

          {userInfo.username ? (
            <div className="userInfo">
              <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <Avatar
                  size={36}
                  src={getShowImg(userInfo.avatar)}
                  alt={userInfo.username}
                />
              </Dropdown>
            </div>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                naviage('/login')
              }}
            >
              登录
            </Button>
          )}
        </div>
      </div>
    </HeaderStyle>
  )
})
