import { CommonComponentProps } from '../interface'
import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import styles from './index.module.less'

const Container = (props: CommonComponentProps) => {
  const { id, style, children } = props
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id)

  return (
    <div
      className={styles['whale-container']}
      ref={drop}
      data-component-id={id}
      style={{
        border: canDrop ? '1px dashed #1890ff' : '1px solid #d9d9d9',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Container
