import { Form, InputNumber, Select } from 'antd'
import { memo } from 'react'

interface IProps {
  placeholder: string
  notafter?: boolean | number
}

export default memo((props: IProps) => {
  const notafter = Boolean(props?.notafter)

  const addonAfter = (
    <Form.Item name={props.placeholder + '-prefix'} noStyle>
      <Select
        options={[
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
        ]}
      ></Select>
    </Form.Item>
  )

  return (
    <InputNumber
      {...props}
      key={props.placeholder}
      style={{ width: '100%' }}
      changeOnWheel
      addonAfter={notafter && addonAfter}
    />
  )
})
