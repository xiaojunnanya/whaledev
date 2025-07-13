import { CommonComponentProps } from '@/materials/interface'
import Container from '@/materials/public/Container/prod'
import { memo } from 'react'
import { FlexStyled } from './style'

export default memo((props: CommonComponentProps) => {
  const { id, children, flexNum } = props

  const showFlexNum = new Array(flexNum).fill(0)

  return (
    <FlexStyled data-component-id={id}>
      {showFlexNum.map((_, index) => {
        return (
          <Container key={index}>
            {/* @ts-ignore */}
            {children?.[index] && [children[index]]}
          </Container>
        )
      })}
    </FlexStyled>
  )
})
