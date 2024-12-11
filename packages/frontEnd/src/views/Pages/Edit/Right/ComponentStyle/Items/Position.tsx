import { Form } from 'antd'
import { memo } from 'react'
import InputNumber from '../Comp/InputNumber'
import Select from '../Comp/Select'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">定位</div>
      <Form.Item name="position" label="定位">
        <Select
          placeholder="position"
          options={[
            {
              label: 'static',
              value: 'static',
            },
            {
              label: 'relative',
              value: 'relative',
            },
            {
              label: 'absolute',
              value: 'absolute',
            },
            {
              label: 'fixed',
              value: 'fixed',
            },
            {
              label: 'sticky',
              value: 'sticky',
            },
          ]}
        />
      </Form.Item>
      {/* 遗留的问题：四周的位置 */}
      {/* {!['', undefined, 'static'].includes(formData?.position) && (
              <Form.Item label="位置">
                <Form.Item name={['scopeStyle', 'top']} noStyle>
                  <InputNumber placeholder="T: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'right']} noStyle>
                  <InputNumber placeholder="R: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'bottom']} noStyle>
                  <InputNumber placeholder="B: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'left']} noStyle>
                  <InputNumber placeholder="L: 10" />
                </Form.Item>
              </Form.Item>
            )} */}
      <Form.Item name="zIndex" label="层级">
        <InputNumber placeholder="zIndex" afterisobj={false} />
      </Form.Item>
      <Form.Item name="overflow" label="溢出">
        <Select
          placeholder="overflow"
          options={[
            {
              label: '默认 auto',
              value: 'auto',
            },
            {
              label: '可见 visible',
              value: 'visible',
            },
            {
              label: '超出隐藏 hidden',
              value: 'hidden',
            },
            {
              label: '超出滚动 scroll',
              value: 'scroll',
            },
          ]}
        />
      </Form.Item>
    </div>
  )
})
