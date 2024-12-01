import { CommonComponentProps } from '../interface'
import styleLess from './index.module.less'

const Page = ({ children, style, ...props }: CommonComponentProps) => {
  return (
    <div className={styleLess['whale-page']} style={style} {...props}>
      {children}
    </div>
  )
}

export default Page
