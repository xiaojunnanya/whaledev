import { CommonComponentProps } from '@/materials/interface'
import { ContainerStyled } from './style'

const Container = ({ children, styles, ...props }: CommonComponentProps) => {
  return (
    <ContainerStyled {...props} style={styles}>
      {children}
    </ContainerStyled>
  )
}

export default Container
