import { memo } from 'react'
import { ContainerStyled } from './style'

export default memo((props: any) => {
  const { children } = props

  const isShowComponent = children && children?.length > 0

  return <ContainerStyled>{isShowComponent ? children : <></>}</ContainerStyled>
})
