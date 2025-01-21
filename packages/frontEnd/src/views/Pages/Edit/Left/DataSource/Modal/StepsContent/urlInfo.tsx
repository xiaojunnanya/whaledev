import ParamInOrDec from '@/components/ParamInOrDec'
import { Form, Input, Radio, Switch } from 'antd'
import { memo } from 'react'

export default memo(() => {
  return (
    <>
      <Form.Item
        label="接口名称"
        name="name"
        rules={[{ required: true, message: '请输入接口名称' }]}
      >
        <Input placeholder="请输入接口中文名称" maxLength={20} showCount />
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
        rules={[
          {
            required: true,
            message: '请输入接口地址',
          },
          {
            pattern: /^(https?:\/\/)([\w.-]+)(:\d+)?(\/[^\s]*)?$/,
            message: 'URL输入格式错误，请确保URL正确',
          },
        ]}
      >
        <Input placeholder="请输入接口地址，需携带http/https" />
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
          <Radio.Button value="multipart/form-data">FormData</Radio.Button>
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
        extra="开启接口代理可帮助解决跨域问题"
      >
        <Switch />
      </Form.Item>
    </>
  )
})
