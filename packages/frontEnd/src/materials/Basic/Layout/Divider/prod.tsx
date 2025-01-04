import { CommonComponentProps } from '@/materials/interface'
import { Divider } from 'antd'
import { memo } from 'react'

export default memo((props: CommonComponentProps) => {
  const { styles, text, ...otherProps } = props

  return <Divider {...otherProps} style={styles} children={text} />
})
