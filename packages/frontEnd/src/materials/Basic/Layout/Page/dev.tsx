import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import { CommonComponentProps } from '@/materials/interface'
import { PageStyled } from './style'

const Page = (props: CommonComponentProps) => {
  const { children, id, styles } = props
  const { drop } = useMaterailDrop('all', id)

  return (
    <PageStyled ref={drop} data-component-id={id} style={styles}>
      {children}
    </PageStyled>
  )
}

export default Page
