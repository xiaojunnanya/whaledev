import { Form } from 'antd'
import { memo } from 'react'
import WInputNumber from '../Comp/WInputNumber'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">基础</div>
      <Form.Item label="宽度" name="width">
        <WInputNumber placeholder="width" notafter={1} />
      </Form.Item>
      <Form.Item label="高度" name="height">
        <WInputNumber placeholder="height" notafter={1} />
      </Form.Item>
      {/* 遗留的问题：自定义不同的边距 */}
      <Form.Item label="边距" name="margin">
        <WInputNumber placeholder="margin" notafter={1} />
      </Form.Item>
      <Form.Item label="内边距" name="padding">
        <WInputNumber placeholder="padding" notafter={1} />
      </Form.Item>
      {/* <Form.Item label="透明度" name="opacity">
        <Slider min={0} max={1} step={0.1} />
      </Form.Item> */}
    </div>
  )
})
