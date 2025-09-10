import { CommonComponentProps } from '@/materials/interface'
import { PageStyled } from './style'

const Page = ({ children, styles, ...props }: CommonComponentProps) => {
  return (
    <PageStyled {...props} style={styles}>
      {children}
    </PageStyled>
  )
}

export default Page
