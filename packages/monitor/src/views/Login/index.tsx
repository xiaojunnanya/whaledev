import { memo } from 'react'
import { LoginStyled } from './style'
import Logo from '../../../favicon.ico'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export default memo(() => {
  return (
    <LoginStyled>
      <div className="container">
        <div className="login-box">
          <div className="logo-container">
            <img className="logo-image" src={Logo} alt="LOGO" />
            <span className="login-title">精灵开发监控系统</span>
          </div>
          <Form
            name="horizontal_login"
            autoComplete="on"
            // onFinish={handleFinish}
            initialValues={{ username: 'admin', password: 'admin123456' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                allowClear
                placeholder="请输入用户名"
                autoComplete="username"
                addonBefore={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                placeholder="请输入密码"
                autoComplete="current-password"
                addonBefore={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="styled-button"
                type="primary"
                htmlType="submit"
                loading={false}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </LoginStyled>
  )
})
