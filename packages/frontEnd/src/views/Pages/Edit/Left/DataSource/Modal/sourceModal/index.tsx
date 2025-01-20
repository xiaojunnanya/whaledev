import { memo, useState } from 'react'

import { SourceModalStyled } from './style'
import { Button, Form, Input, Radio, Steps, Switch } from 'antd'
import ParamInOrDec from '@/components/ParamInOrDec'
import ContainerVh from '@/components/ContainerVh'

const initValue = {
  name: '',
  method: 'GET',
  url: '',
  params: [{ key: '', value: '' }],
  body: [{ key: '', value: '' }],
  isCors: true,
  'Content-Type': 'application/json',
}

const steps = [
  {
    title: '接口设置',
    content: 'First-content',
  },
  {
    title: '字段映射',
    content: 'Second-content',
  },
  {
    title: '数据预览',
    content: 'Last-content',
  },
]

export default memo(() => {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)

  const next = () => {
    if (current === 0) {
      form.validateFields(['name', 'url']).then(() => {
        setCurrent(current + 1)
        // console.log(form.getFieldsValue())
      })
    }
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map(item => ({ key: item.title, title: item.title }))

  return (
    <SourceModalStyled>
      <Steps current={current} items={items} style={{ marginBottom: 20 }} />
      <ContainerVh height={275}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          initialValues={initValue}
          form={form}
        >
          {current === 0 && (
            <>
              <Form.Item
                label="接口名称"
                name="name"
                rules={[{ required: true, message: '请输入接口名称' }]}
              >
                <Input
                  placeholder="请输入接口中文名称"
                  maxLength={20}
                  showCount
                />
              </Form.Item>
              <Form.Item label="请求方式" name="method">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="GET">GET</Radio.Button>
                  <Radio.Button value="POST">POST</Radio.Button>
                  <Radio.Button value="PATCH">PATCH</Radio.Button>
                  <Radio.Button value="DELETE">DELETE</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="接口地址"
                name="url"
                rules={[{ required: true, message: '请输入接口地址' }]}
              >
                <Input placeholder="请输入接口URL" />
              </Form.Item>
              <ParamInOrDec
                formData={{
                  label: 'Params参数',
                  name: 'params',
                }}
              ></ParamInOrDec>
              <ParamInOrDec
                formData={{
                  label: 'Body参数',
                  name: 'body',
                }}
              ></ParamInOrDec>
              <Form.Item label="Body数据格式" name="Content-Type">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="application/json">JSON</Radio.Button>
                  <Radio.Button value="multipart/form-data">
                    FormData
                  </Radio.Button>
                  <Radio.Button value="application/x-www-form-urlencoded">
                    x-www-form-urlencoded
                  </Radio.Button>
                  <Radio.Button value="application/xml">XML</Radio.Button>
                  <Radio.Button value="text/plain">RAW</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="开启代理"
                name="isCors"
                extra="开启接口代理对解决跨域问题很有用"
              >
                <Switch />
              </Form.Item>
            </>
          )}
          {current === 1 && <>Last-content</>}
          {current === 2 && <>First-content</>}
        </Form>
      </ContainerVh>
      <div className="operateBtn">
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && <Button type="primary">完成</Button>}
      </div>
    </SourceModalStyled>
  )
})
