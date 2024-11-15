import { memo, useEffect, useState } from 'react'

import {
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { getCodeImg, login } from '@/service/request/login'
import { useNavigate } from 'react-router-dom'
import SparkMD5 from 'spark-md5'
import { useGlobal } from '@/stores/global'
import { gloablErrorMessage } from '@/utils/global'

export default memo(() => {
  const { setMode, setMessage } = useGlobal()
  const [form] = Form.useForm()
  const [codeImg, setCodeImg] = useState<string>('')
  const naviage = useNavigate()

  useEffect(() => {
    updateCode()
  }, [])

  const onFinish = async (values: any) => {
    const valuesData = {
      ...values,
      password: SparkMD5.hash(values.password),
    }
    const { data, status } = await login(valuesData)
    const { messageType } = data

    if (status === 0 && messageType === 'success') {
      setMessage({ type: 'success', text: data.message })
      // 遗留的问题：token存储，但是如果使用单token刷新，token在请求头中，放在响应拦截器中处理
      // 遗留的问题：登录成功应该跳转到界面设计页
      naviage('/')
    } else {
      setMessage({
        type: messageType,
        text: data.message || gloablErrorMessage,
      })
      updateCode()
      form.resetFields(['checkCode'])
    }

    console.log('data', data)
    // const spark = new SparkMD5()
    // spark.append(values.password)
    // const password = spark.end()
    // values.password = password
  }

  const updateCode = () => {
    setCodeImg(getCodeImg())
  }

  const changeMode = (e: any, index: number) => {
    e.stopPropagation()
    if (index === 1) {
      setMode('forget')
    }
    if (index === 2) {
      setMode('account')
    }
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        form={form}
        initialValues={{
          email: '2376974436@qq.com',
          password: 'qwer1234',
          code: '1234',
        }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="请输入邮箱"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
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
              changeMode(e, 1)
            }}
          >
            忘记密码？
          </a>
          <a
            className="login-form-forgot"
            onClick={e => {
              changeMode(e, 2)
            }}
          >
            没有账户？
          </a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          <Button
            className="login-form-button"
            style={{ marginTop: '20px' }}
            onClick={() => {
              naviage('/')
            }}
          >
            返回首页
          </Button>
        </Form.Item>
      </Form>
    </>
  )
})
