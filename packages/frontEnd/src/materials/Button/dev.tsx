import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../interface'
import styleLess from './index.module.less'

const Button = (props: CommonComponentProps) => {
  const { id, text, type, styles } = props
  return (
    <AntdButton
      type={type}
      className={styleLess['whale-button']}
      style={styles}
      data-component-id={id}
    >
      {text}
    </AntdButton>
  )
}

export default Button
