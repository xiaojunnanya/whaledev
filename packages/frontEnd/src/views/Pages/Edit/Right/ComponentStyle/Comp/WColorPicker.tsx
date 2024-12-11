import { memo } from 'react'
import theme from '@/assets/theme'
import { ColorPicker, Form } from 'antd'

const primaryColor = Object.values(theme.primaryColor)
const defaultColor = Object.values(theme.defaultColor)

interface IProps {
  label: string
  name: string
}

export default memo((props: IProps) => {
  const { label, name } = props

  return (
    <Form.Item name={name} label={label}>
      <ColorPicker
        showText
        allowClear
        arrow={false}
        presets={[
          {
            label: 'PrimaryColor',
            colors: primaryColor,
          },
          {
            label: 'DefaultColor',
            colors: defaultColor,
          },
        ]}
      ></ColorPicker>
    </Form.Item>
  )
})
