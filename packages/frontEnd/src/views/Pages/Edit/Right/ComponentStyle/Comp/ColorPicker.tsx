import { memo } from 'react'
import theme from '@/assets/theme'
import { ColorPicker } from 'antd'

const primaryColor = Object.values(theme.primaryColor)
const defaultColor = Object.values(theme.defaultColor)

const WColorPicker = memo(() => {
  return (
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
  )
})

export default WColorPicker
