import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../../interface'
import styleLess from './index.module.less'
import { createElement } from 'react'
import { WhaleIcons } from '@/utils/global'

const iconsList: { [key: string]: any } = WhaleIcons

const Button = (props: CommonComponentProps) => {
  const { id, text, styles, icon, ...otherProps } = props

  return (
    <AntdButton
      className={styleLess['whale-button']}
      style={styles}
      icon={icon && createElement(iconsList[icon])}
      data-component-id={id}
      {...otherProps}
    >
      {text}
    </AntdButton>
  )
}

export default Button
