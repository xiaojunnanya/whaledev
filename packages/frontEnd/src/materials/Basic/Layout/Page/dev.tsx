import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import { CommonComponentProps } from '@/materials/interface'

const Page = (props: CommonComponentProps) => {
  const { children, id, styles } = props
  const { drop } = useMaterailDrop(
    ['Button', 'Container', 'Divider', 'Input'],
    id,
  )

  return (
    <div ref={drop} data-component-id={id} style={styles}>
      {children}
    </div>
  )
}

export default Page
