import { Form } from 'antd'
import { memo } from 'react'
import InputNumber from '../Comp/InputNumber'
import ColorPicker from '../Comp/ColorPicker'
import Select from '../Comp/Select'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">文字</div>
      <Form.Item label="字体大小" name="fontSize">
        <InputNumber placeholder="fontSize" />
      </Form.Item>
      <Form.Item label="行高" name="lineHeight">
        <InputNumber placeholder="lineHeight" />
      </Form.Item>
      <Form.Item label="字体粗细" name="fontWeight">
        <Select
          placeholder="fontWeight"
          options={[
            {
              value: 100,
              label: '100 Thin',
            },
            {
              value: 200,
              label: '200 Extra Light',
            },
            {
              value: 300,
              label: '300 Light',
            },

            {
              value: 400,
              label: '400 Normal',
            },
            {
              value: 500,
              label: '500 Medium',
            },
            {
              value: 600,
              label: '600 Semi Bold',
            },
            {
              value: 700,
              label: '700 Bold',
            },
            {
              value: 800,
              label: '800 Extra Bold',
            },
            {
              value: 900,
              label: '900 Black Bold',
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="color" label="颜色">
        <ColorPicker />
      </Form.Item>
      <Form.Item label="对齐" name="textAlign">
        <Select
          placeholder="textAlign"
          options={[
            {
              value: 'left',
              label: '左对齐 left',
            },
            {
              value: 'center',
              label: '居中对齐 center',
            },
            {
              value: 'right',
              label: '右对齐 right',
            },
          ]}
        ></Select>
      </Form.Item>
    </div>
  )
})
