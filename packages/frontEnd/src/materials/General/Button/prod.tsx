import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../../interface'
import styleLess from './index.module.less'
import { WhaleIcons } from '@/utils/global'
import { createElement } from 'react'

const iconsList: { [key: string]: any } = WhaleIcons

const Button = (props: CommonComponentProps) => {
  const { text, type, styles, icon, ...otherProps } = props
  return (
    <AntdButton
      type={type}
      className={styleLess['whale-button']}
      style={styles}
      icon={icon && createElement(iconsList[icon])}
      {...otherProps}
    >
      {text}
    </AntdButton>
  )
}

export default Button
