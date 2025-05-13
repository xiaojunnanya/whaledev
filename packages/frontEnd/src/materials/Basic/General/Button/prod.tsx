import { Button as AntdButton } from 'antd'
import { WhaleIcons } from '@/utils/global'
import { createElement } from 'react'
import { CommonComponentProps } from '@/materials/interface'

const iconsList: { [key: string]: any } = WhaleIcons

const Button = (props: CommonComponentProps) => {
  const { text, type, styles, children, icon, ...otherProps } = props
  return (
    <AntdButton
      {...otherProps}
      type={type}
      style={styles}
      icon={icon && createElement(iconsList[icon])}
    >
      {text}
    </AntdButton>
  )
}

export default Button
