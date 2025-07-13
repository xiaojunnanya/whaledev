import { memo } from 'react'
import { ContainerStyled } from './style'
import { useMaterailDrop } from '@/hooks/useMaterialDrop'

export default memo((props: any) => {
  const { children, id } = props
  const { drop } = useMaterailDrop('all', id)

  const isShowComponent = children && children?.length > 0

  return (
    <ContainerStyled ref={drop}>
      {isShowComponent ? (
        children
      ) : (
        <div className="drag-tips">拖拽组件到这里</div>
      )}
    </ContainerStyled>
  )
})
