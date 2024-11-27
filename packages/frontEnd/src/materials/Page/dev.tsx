import { CommonComponentProps } from '../interface'
import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import styles from './index.module.less'

const Container = ({ children, id, style }: CommonComponentProps) => {
  const { drop } = useMaterailDrop(['Button', 'Container'], id)

  return (
    <div
      className={styles['whale-page']}
      ref={drop}
      data-component-id={id}
      style={style}
    >
      {children}
    </div>
  )
}

export default Container
