import { Form, Input } from 'antd'
import { memo } from 'react'
import WColorPicker from '../Comp/ColorPicker'
import WSelect from '../Comp/Select'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">背景</div>
      <Form.Item name="backgroundColor" label="颜色">
        <WColorPicker />
      </Form.Item>
      <Form.Item name="backgroundImage" label="图片">
        <Input placeholder="backgroundImage" />
      </Form.Item>
      <Form.Item name="backgroundSize" label="尺寸">
        <WSelect
          placeholder="backgroundSize"
          options={[
            {
              label: '默认 auto',
              value: 'auto',
            },
            {
              label: '等比填充 contain',
              value: 'contain',
            },
            {
              label: '等比覆盖 cover',
              value: 'cover',
            },
          ]}
        ></WSelect>
      </Form.Item>
      <Form.Item label="平铺" name="backgroundRepeat">
        <WSelect
          placeholder="backgroundRepeat"
          options={[
            {
              label: '不平铺 no-repeat',
              value: 'no-repeat',
            },
            {
              label: '平铺 repeat',
              value: 'repeat',
            },
            {
              label: '水平平铺 repeat-x',
              value: 'repeat-x',
            },
            {
              label: '垂直平铺 repeat-y',
              value: 'repeat-y',
            },
          ]}
        ></WSelect>
      </Form.Item>
      <Form.Item name="backgroundPosition" label="位置">
        <WSelect
          placeholder="backgroundPosition"
          options={[
            {
              label: 'top',
              value: 'top',
            },
            {
              label: 'bottom',
              value: 'bottom',
            },
            {
              label: 'left',
              value: 'left',
            },
            {
              label: 'right',
              value: 'right',
            },
            {
              label: 'center',
              value: 'center',
            },
          ]}
        ></WSelect>
      </Form.Item>
    </div>
  )
})
