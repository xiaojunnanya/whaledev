import { Form, FormInstance, Input, Radio, Select } from 'antd'
import { memo, useState } from 'react'

interface IProps {
  form: FormInstance
}

const linkTypeOptions = [
  { label: '系统内跳转', value: 'system' },
  { label: '超链接跳转', value: 'alink' },
]

const linkOptions = [
  {
    label: '系统路由',
    title: 'manager',
    options: [
      { label: '首页', value: '/' },
      { label: '登录页', value: '/login' },
      { label: '项目列表', value: '/engineering/project' },
      { label: '个人中心', value: '/userinfo' },
    ],
  },
  {
    label: '项目路由',
    title: 'engineer',
    options: [],
  },
]

export default memo((props: IProps) => {
  const { form } = props

  const [type, setType] = useState(form.getFieldValue('jumpLink-type') || '')

  const handleChange = (value: string) => {
    setType(value)
    form.setFieldsValue({
      'jumpLink-link': null,
    })
  }

  return (
    <>
      <Form.Item
        label="跳转方式"
        name="jumpLink-type"
        rules={[{ required: true, message: '请选择跳转方式' }]}
      >
        <Radio.Group
          block
          options={linkTypeOptions}
          optionType="button"
          buttonStyle="solid"
          onChange={e => handleChange(e.target.value)}
        />
      </Form.Item>

      {type === 'system' && (
        <Form.Item
          label="跳转地址"
          name="jumpLink-link"
          rules={[{ required: true, message: '请选择跳转地址' }]}
        >
          <Select placeholder="请选择跳转地址" options={linkOptions} />
        </Form.Item>
      )}

      {type === 'alink' && (
        <Form.Item
          label="跳转链接"
          name="jumpLink-link"
          rules={[{ required: true, message: '请输入跳转链接' }]}
        >
          <Input type="text" placeholder="请输入跳转链接" />
        </Form.Item>
      )}
    </>
  )
})
