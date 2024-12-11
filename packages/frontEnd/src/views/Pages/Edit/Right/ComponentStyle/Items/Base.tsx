import { Form, Slider } from 'antd'
import { memo } from 'react'
import WInputNumber from '../Comp/InputNumber'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">基础</div>
      <Form.Item label="宽度" name="width">
        <WInputNumber placeholder="width" notAfter />
      </Form.Item>
      <Form.Item label="高度" name="height">
        <WInputNumber placeholder="height" notAfter />
      </Form.Item>
      {/* 遗留的问题：自定义不同的边距 */}
      <Form.Item label="边距" name="margin">
        <WInputNumber placeholder="margin" notAfter />
      </Form.Item>
      <Form.Item label="内边距" name="padding">
        <WInputNumber placeholder="padding" notAfter />
      </Form.Item>
      <Form.Item label="透明度" name="opacity">
        <Slider min={0} max={1} step={0.1} />
      </Form.Item>
    </div>
  )
})
