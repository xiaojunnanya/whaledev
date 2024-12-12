import { Form } from 'antd'
import { memo } from 'react'
import WInputNumber from '../Comp/WInputNumber'
import WSelect from '../Comp/WSelect'

export default memo(() => {
  return (
    <div className="whale-style">
      <div className="whale-right-title">定位</div>
      <Form.Item name="position" label="定位">
        <WSelect
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
                  <WInputNumber placeholder="T: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'right']} noStyle>
                  <WInputNumber placeholder="R: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'bottom']} noStyle>
                  <WInputNumber placeholder="B: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'left']} noStyle>
                  <WInputNumber placeholder="L: 10" />
                </Form.Item>
              </Form.Item>
            )} */}
      <Form.Item name="zIndex" label="层级">
        <WInputNumber placeholder="zIndex" />
      </Form.Item>
      <Form.Item name="overflow" label="溢出">
        <WSelect
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
