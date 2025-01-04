import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import styleLess from './index.module.less'
import { CommonComponentProps } from '@/materials/interface'

const Page = (props: CommonComponentProps) => {
  const { children, id, styles } = props
  const { drop } = useMaterailDrop(['Button', 'Container', 'Divider'], id)

  return (
    <div
      className={styleLess['whale-page']}
      ref={drop}
      data-component-id={id}
      style={styles}
    >
      {children}
    </div>
  )
}

export default Page
