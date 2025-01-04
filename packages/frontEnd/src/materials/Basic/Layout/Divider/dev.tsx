import { CommonComponentProps } from '@/materials/interface'
import { Divider } from 'antd'
import { memo } from 'react'

export default memo((props: CommonComponentProps) => {
  const { id, styles, text, ...otherProps } = props

  return (
    <Divider
      {...otherProps}
      style={styles}
      data-component-id={id}
      children={text}
    />
  )
})
