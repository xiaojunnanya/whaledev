import { Form, Input, Radio } from 'antd'
import { memo } from 'react'

const options = [
  { label: '系统内跳转', value: 'system' },
  { label: '超链接跳转', value: 'alink' },
]

export default memo(() => {
  return (
    <>
      <Form.Item
        label="跳转方式"
        name="jumpLink-type"
        rules={[{ required: true, message: '请选择跳转方式' }]}
      >
        <Radio.Group
          block
          options={options}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>
      <Form.Item
        label="跳转链接"
        name="jumpLink-link"
        rules={[{ required: true, message: '请输入跳转链接' }]}
      >
        <Input type="text" placeholder="请输入跳转链接" />
      </Form.Item>
    </>
  )
})
