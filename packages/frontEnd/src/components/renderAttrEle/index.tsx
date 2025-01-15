import { ComponentSetter } from '@/materials/interface'
import { QuestionCircleOutlined } from '@ant-design/icons'
import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  Segmented,
  Select,
  Switch,
  Tooltip,
} from 'antd'
import { memo } from 'react'
import SelectIcon from './com/SelectIcon'

interface IProps {
  setting: ComponentSetter
  form: FormInstance
  valueChange: any
}

export default memo((props: IProps) => {
  const { setting, form, valueChange } = props

  const { type, options, name, label, prompt, placeholder, max, min } = setting

  return (
    <Form.Item
      key={name}
      name={name}
      label={
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
          {prompt && (
            <Tooltip title={prompt} arrow>
              <QuestionCircleOutlined style={{ marginLeft: '5px' }} />
            </Tooltip>
          )}
        </span>
      }
    >
      {type === 'select' && <Select options={options} />}
      {type === 'input' && <Input placeholder={placeholder} />}
      {type === 'inputNumber' && (
        <InputNumber
          style={{ width: '100%' }}
          placeholder={placeholder}
          max={max}
          min={min}
        />
      )}
      {type === 'switch' && <Switch />}
      {type == 'segmented' && <Segmented options={options || []} />}
      {type == 'selectIcon' && (
        <SelectIcon form={form} name={name} valueChange={valueChange} />
      )}
    </Form.Item>
  )
})
