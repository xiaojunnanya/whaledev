import Header from '@/components/Header'
import { memo, useState } from 'react'
import { UserInfoStyled } from './style'
import {
  CheckOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  GoogleOutlined,
  LockOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import { Button, Input } from 'antd'

export default memo(() => {
  const [editNickname, setEditNickname] = useState(false)
  const [nickName, setNickName] = useState('鲸灵开发用户')

  return (
    <>
      <Header />
      <UserInfoStyled>
        <div className="container">
          <div className="headerBanner"></div>
          <div className="contentAll">
            {/* 头像昵称 */}
            <div className="avatar">
              <div className="image">
                <img src="http://www.xiaojunnan.cn/img/logo.webp" alt="" />
              </div>
              <div className="userinfo">
                <div className="nickname">
                  {editNickname ? (
                    <Input
                      type="text"
                      placeholder="请输入昵称"
                      value={nickName}
                      onChange={e => setNickName(e.target.value)}
                    />
                  ) : (
                    <span className="name">{nickName}</span>
                  )}
                  <div
                    onClick={() => setEditNickname(!editNickname)}
                    className="editNick"
                  >
                    {editNickname ? <CheckOutlined /> : <EditOutlined />}
                  </div>
                </div>
                <div className="userdesc">一个热爱编程的年轻人</div>
              </div>
            </div>
            {/* 基本信息 */}
            <div className="baseInfo">
              <h3 className="title">基本信息</h3>
              <div className="contentItems">
                <div className="item">
                  <div className="info">
                    <div className="itemTitle">账户</div>
                    <div className="itemDesc">2376974436@qq.com</div>
                  </div>
                  <div className="info">
                    <div className="itemTitle">注册日期</div>
                    <div className="itemDesc">2024-11-20 18:03:18</div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            {/* 账号绑定 */}
            <div className="accountInfo">
              <h3 className="title">账号绑定</h3>
              <div className="contentItems">
                <div className="item">
                  <div className="itemLeft">
                    <GoogleOutlined />
                    <div className="itemInfo">
                      <div className="itemTitle">谷歌账号绑定</div>
                      <div className="itemDesc">敬请期待</div>
                    </div>
                  </div>
                  <Button disabled>绑定</Button>
                </div>
                <div className="item">
                  <div className="itemLeft">
                    <GithubOutlined />
                    <div className="itemInfo">
                      <div className="itemTitle">Github账号绑定</div>
                      <div className="itemDesc">敬请期待</div>
                    </div>
                  </div>
                  <Button disabled>绑定</Button>
                </div>
                <div className="item">
                  <div className="itemLeft">
                    <PhoneOutlined />
                    <div className="itemInfo">
                      <div className="itemTitle">手机号绑定</div>
                      <div className="itemDesc">敬请期待</div>
                    </div>
                  </div>
                  <Button disabled>绑定</Button>
                </div>
              </div>
              <hr />
            </div>
            {/* 账号安全 */}
            <div className="accountSafe">
              <h3 className="title">账号安全</h3>
              <div className="contentItems">
                <div className="item">
                  <div className="itemLeft">
                    <LockOutlined />
                    <div className="itemInfo">
                      <div className="itemTitle">密码修改</div>
                      <div className="itemDesc">*********</div>
                    </div>
                  </div>
                  <Button disabled>修改</Button>
                </div>
                <div className="item">
                  <div className="itemLeft">
                    <ExclamationCircleOutlined />
                    <div className="itemInfo">
                      <div className="itemTitle">注销账号</div>
                      <div className="itemDesc">
                        一旦注销用户，用户资源（项目/页面/组件/图片等）将被删除且无法挽回！
                      </div>
                    </div>
                  </div>
                  <Button disabled>注销</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserInfoStyled>
    </>
  )
})
