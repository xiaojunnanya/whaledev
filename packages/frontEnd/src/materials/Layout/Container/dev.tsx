import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import styleLess from './index.module.less'
import { CommonComponentProps } from '@/materials/interface'

const Container = (props: CommonComponentProps) => {
  const { id, styles, children } = props

  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id)

  return (
    <div
      className={styleLess['whale-container']}
      ref={drop}
      data-component-id={id}
      style={styles}
    >
      {children}
    </div>
  )
}

export default Container
