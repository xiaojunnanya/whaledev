import { ComponentSetter } from '@/materials/interface'
import { Form, Input, InputNumber, Select } from 'antd'
import { memo } from 'react'

interface IProps {
  setting: ComponentSetter
}

export default memo((props: IProps) => {
  const { setting } = props
  const { type, options, name, label } = setting

  return (
    <Form.Item key={name} name={name} label={label}>
      {type === 'select' && <Select options={options} />}
      {type === 'input' && <Input />}
      {type === 'inputNumber' && <InputNumber />}
    </Form.Item>
  )
})
