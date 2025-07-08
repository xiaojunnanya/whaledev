import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import { CommonComponentProps } from '@/materials/interface'
import { ContainerStyled } from './style'

const Container = (props: CommonComponentProps) => {
  const { id, styles, children } = props

  const { drop } = useMaterailDrop(
    ['Button', 'Container', 'Divider', 'Input'],
    id,
  )

  return (
    <ContainerStyled ref={drop} data-component-id={id} style={styles}>
      {children}
    </ContainerStyled>
  )
}

export default Container
