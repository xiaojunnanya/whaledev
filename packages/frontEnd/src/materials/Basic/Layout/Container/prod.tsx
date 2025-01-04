import { CommonComponentProps } from '@/materials/interface'
import styleLess from './index.module.less'

const Container = ({ children, styles, ...props }: CommonComponentProps) => {
  return (
    <div {...props} className={styleLess['whale-container']} style={styles}>
      {children}
    </div>
  )
}

export default Container
