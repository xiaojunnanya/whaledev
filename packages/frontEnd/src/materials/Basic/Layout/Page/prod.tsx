import { CommonComponentProps } from '@/materials/interface'
import styleLess from './index.module.less'

const Page = ({ children, style, ...props }: CommonComponentProps) => {
  return (
    <div {...props} className={styleLess['whale-page']} style={style}>
      {children}
    </div>
  )
}

export default Page
