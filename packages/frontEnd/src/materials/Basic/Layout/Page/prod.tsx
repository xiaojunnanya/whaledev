import { CommonComponentProps } from '@/materials/interface'
import { PageStyled } from './style'

const Page = ({ children, style, ...props }: CommonComponentProps) => {
  return (
    <PageStyled {...props} style={style}>
      {children}
    </PageStyled>
  )
}

export default Page
