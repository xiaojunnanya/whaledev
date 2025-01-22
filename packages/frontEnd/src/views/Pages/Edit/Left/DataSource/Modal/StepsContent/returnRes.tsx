import { Form, Input } from 'antd'
import { memo } from 'react'

export default memo(() => {
  return (
    <>
      <Form.Item
        label="返回数据命名"
        name="res"
        rules={[{ required: true, message: '请输入返回数据命名' }]}
        extra="默认调用接口直接返回的数据命名为data,可以在这里进行截取，如返回data.data"
      >
        <Input placeholder="请输入返回数据命名" maxLength={20} showCount />
      </Form.Item>
    </>
  )
})
