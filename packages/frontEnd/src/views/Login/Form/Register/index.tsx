import { memo, useEffect, useState } from 'react'

import {
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useGlobal } from '@/stores/global'
import { getCodeImg, register, sendEmail } from '@/service/request/login'
import { gloablErrorMessage } from '@/utils/global'
import SparkMD5 from 'spark-md5'

export default memo(() => {
  const { setMode, setMessage } = useGlobal()
  const [form] = Form.useForm()
  const [codeImg, setCodeImg] = useState<string>('')
  const [btnName, setBtnName] = useState<string>('获取验证码')

  useEffect(() => {
    updateCode()
  }, [])

  const onFinish = async (values: any) => {
    const valuesData = {
      ...values,
      password: SparkMD5.hash(values.password),
      confirmPassword: SparkMD5.hash(values.confirmPassword),
    }

    const { msgType, message } = await register(valuesData)

    if (msgType === 'success') {
      setMessage({ type: 'success', text: message })
      setMode('login')
    } else {
      setMessage({
        type: msgType,
        text: message || gloablErrorMessage,
      })
      updateCode()
      form.resetFields(['code'])
    }
  }

  const updateCode = () => {
    setCodeImg(getCodeImg())
  }

  const getEmailCode = () => {
    form
      .validateFields(['email'])
      .then(async ({ email }: { email: string }) => {
        const { msgType, message } = await sendEmail(email, 'register')
        if (msgType === 'success') {
          downTime()
          setMessage({ type: 'success', text: message })
        } else {
          setMessage({
            type: msgType,
            text: message || gloablErrorMessage,
          })
        }
      })
  }

  const downTime = () => {
    let time = 60

    const fn = () => {
      time--
      setBtnName(`重新获取(${time}s)`)
      if (time === 0) {
        setBtnName('获取验证码')
        clearInterval(a)
      }
    }
    fn()
    let a = setInterval(fn, 1000)
  }

  const aClick = (e: any, index: number) => {
    e.stopPropagation()
    if (index === 1) {
      setMode('login')
    }
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            {
              validator(_, value, callback) {
                // 必须既有数字也有字母
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  callback('请输入合法的邮箱格式')
                } else {
                  return Promise.resolve()
                }
              },
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="请输入邮箱"
          />
        </Form.Item>
        <div className="emailCode">
          <Form.Item
            name="emailCode"
            rules={[{ required: true, message: '请输入邮箱验证码' }]}
          >
            <Input
              prefix={
                <SafetyCertificateOutlined className="site-form-item-icon" />
              }
              placeholder="请邮箱验证码"
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={getEmailCode}
            disabled={btnName !== '获取验证码'}
          >
            {btnName}
          </Button>
        </div>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 8, max: 18, message: '密码长度不能小于8位且不能超过18位' },
            {
              validator(_, value, callback) {
                // 正则：必须既有数字也有字母
                if (
                  !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/.test(value)
                ) {
                  callback('密码必须要由数字和字母组成')
                } else {
                  return Promise.resolve()
                }
              },
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: '请输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('两次密码输入不一致')
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请再次输入密码"
          />
        </Form.Item>
        <div className="checkCode">
          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              prefix={
                <SafetyCertificateOutlined className="site-form-item-icon" />
              }
              placeholder="请输入验证码"
            />
          </Form.Item>
          <div onClick={updateCode}>
            <img src={codeImg} alt="验证码" />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <a
            className="login-form-forgot"
            onClick={e => {
              aClick(e, 1)
            }}
          >
            去登录？
          </a>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  )
})
