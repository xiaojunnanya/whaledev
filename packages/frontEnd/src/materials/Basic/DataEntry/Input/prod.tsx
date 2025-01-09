import { CommonComponentProps } from '@/materials/interface'
import { memo } from 'react'
import styleLess from './index.module.less'
import { Input } from 'antd'

export default memo((props: CommonComponentProps) => {
  const { styles, children, ...otherProps } = props

  return (
    <Input
      {...otherProps}
      className={styleLess['whale-input']}
      style={styles}
    />
  )
})
