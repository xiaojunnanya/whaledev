import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../interface'
import styles from './index.module.less'

const Button = (props: CommonComponentProps) => {
  const { id, text, type, style } = props
  return (
    <AntdButton
      type={type}
      className={styles['whale-button']}
      style={style}
      data-component-id={id}
    >
      {text}
    </AntdButton>
  )
}

export default Button
