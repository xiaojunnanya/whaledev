import { Form } from 'antd'
import { memo } from 'react'
import WInputNumber from '../Comp/WInputNumber'
import WColorPicker from '../Comp/WColorPicker'
import WSelect from '../Comp/WSelect'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">文字</div>
      <Form.Item label="字体大小" name="fontSize">
        <WInputNumber placeholder="fontSize" />
      </Form.Item>
      <Form.Item label="行高" name="lineHeight">
        <WInputNumber placeholder="lineHeight" />
      </Form.Item>
      <Form.Item label="字体粗细" name="fontWeight">
        <WSelect
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
        ></WSelect>
      </Form.Item>
      <Form.Item name="color" label="颜色">
        <WColorPicker />
      </Form.Item>
      <Form.Item label="对齐" name="textAlign">
        <WSelect
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
        ></WSelect>
      </Form.Item>
    </div>
  )
})
