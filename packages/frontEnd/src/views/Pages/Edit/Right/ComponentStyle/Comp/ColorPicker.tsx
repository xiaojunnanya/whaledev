import { ColorPicker } from 'antd'
import { memo } from 'react'
import theme from '@/assets/theme'

export default memo(() => {
  return (
    <ColorPicker
      showText
      allowClear
      arrow={false}
      presets={[
        {
          label: 'PrimaryColor',
          colors: Object.values(theme.primaryColor),
        },
        {
          label: 'DefaultColor',
          colors: Object.values(theme.defaultColor),
        },
      ]}
    ></ColorPicker>
  )
})
