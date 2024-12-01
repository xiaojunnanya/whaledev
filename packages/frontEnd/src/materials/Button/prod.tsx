import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../interface'
import styleLess from './index.module.less'

const Button = (props: CommonComponentProps) => {
  const { text, type, styles } = props
  return (
    <AntdButton
      type={type}
      className={styleLess['whale-button']}
      style={styles}
    >
      {text}
    </AntdButton>
  )
}

export default Button
