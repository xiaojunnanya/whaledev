import { Form } from 'antd'
import { memo } from 'react'
import InputNumber from '../Comp/InputNumber'
import ColorPicker from '../Comp/ColorPicker'
import Select from '../Comp/Select'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">边框</div>
      <Form.Item name="borderRadius" label="圆角">
        <InputNumber placeholder="borderRadius" afterisobj={false} />
      </Form.Item>
      <Form.Item name="borderWidth" label="边框宽度">
        <InputNumber placeholder="borderWidth" afterisobj={false} />
      </Form.Item>
      <Form.Item name="borderStyle" label="边框样式">
        <Select
          placeholder="borderStyle"
          options={[
            {
              label: '无边框 none',
              value: 'none',
            },
            {
              label: '斑点 dotted',
              value: 'dotted',
            },
            {
              label: '单实线 solid',
              value: 'solid',
            },
            {
              label: '双实线 double',
              value: 'double',
            },
            {
              label: '虚线 dashed',
              value: 'dashed',
            },
            {
              label: '隐藏 hidden',
              value: 'hidden',
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="borderColor" label="边框颜色">
        <ColorPicker />
      </Form.Item>

      {/* 遗留的问题：阴影 */}
    </div>
  )
})
