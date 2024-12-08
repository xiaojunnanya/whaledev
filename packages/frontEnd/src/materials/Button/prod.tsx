import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../interface'
import styleLess from './index.module.less'

const Button = (props: CommonComponentProps) => {
  const { text, type, styles, ...rest } = props
  return (
    <AntdButton
      type={type}
      className={styleLess['whale-button']}
      style={styles}
      {...rest}
    >
      {text}
    </AntdButton>
  )
}

export default Button
