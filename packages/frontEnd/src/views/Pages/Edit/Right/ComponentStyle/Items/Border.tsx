import { Form } from 'antd'
import { memo } from 'react'
import WInputNumber from '../Comp/WInputNumber'
import WColorPicker from '../Comp/WColorPicker'
import WSelect from '../Comp/WSelect'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">边框</div>
      <Form.Item name="borderRadius" label="圆角">
        <WInputNumber placeholder="borderRadius" notafter={1} />
      </Form.Item>
      <Form.Item name="borderWidth" label="宽度">
        <WInputNumber placeholder="borderWidth" notafter={1} />
      </Form.Item>
      <Form.Item name="borderStyle" label="样式">
        <WSelect
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
        ></WSelect>
      </Form.Item>
      <WColorPicker name="borderColor" label="颜色" />
    </div>
  )
})
