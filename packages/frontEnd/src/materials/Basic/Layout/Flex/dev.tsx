import { useMaterailDrop } from '@/hooks/useMaterialDrop'
import { CommonComponentProps } from '@/materials/interface'
import Container from '@/materials/public/Container'
import { memo } from 'react'
import { FlexStyled } from './style'

export default memo((props: CommonComponentProps) => {
  const { id, children, flexNum } = props
  const { drop } = useMaterailDrop('all', id)

  const showFlexNum = new Array(flexNum).fill(0)

  return (
    <FlexStyled data-component-id={id} ref={drop}>
      {showFlexNum.map((_, index) => {
        return (
          <Container id={id} key={index}>
            {/* @ts-ignore */}
            {children?.[index] && [children[index]]}
          </Container>
        )
      })}
    </FlexStyled>
  )
})
