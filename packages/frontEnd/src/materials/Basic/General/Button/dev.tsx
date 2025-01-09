import { Button as AntdButton } from 'antd'
import styleLess from './index.module.less'
import { createElement } from 'react'
import { WhaleIcons } from '@/utils/global'
import { CommonComponentProps } from '@/materials/interface'

const iconsList: { [key: string]: any } = WhaleIcons

const Button = (props: CommonComponentProps) => {
  const { id, text, styles, icon, children, ...otherProps } = props

  return (
    <AntdButton
      {...otherProps}
      className={styleLess['whale-button']}
      style={styles}
      icon={icon && createElement(iconsList[icon])}
      data-component-id={id}
    >
      {text}
    </AntdButton>
  )
}

export default Button
