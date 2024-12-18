import { CommonComponentProps } from '@/materials/interface'
import styleLess from './index.module.less'

const Container = ({ children, styles, ...props }: CommonComponentProps) => {
  return (
    <div className={styleLess['whale-container']} style={styles} {...props}>
      {children}
    </div>
  )
}

export default Container
