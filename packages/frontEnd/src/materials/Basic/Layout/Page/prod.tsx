import { CommonComponentProps } from '@/materials/interface'

const Page = ({ children, style, ...props }: CommonComponentProps) => {
  return (
    <div {...props} style={style}>
      {children}
    </div>
  )
}

export default Page
