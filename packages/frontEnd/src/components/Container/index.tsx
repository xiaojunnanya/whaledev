import { memo } from 'react'
import { ContainerStyled } from './style'

interface IProps {
  children: React.ReactNode
  height?: number
}

export default memo((props: IProps) => {
  // 遗留的问题：这个高度？？？
  const { children, height = 48 } = props
  return <ContainerStyled height={100}>{children}</ContainerStyled>
})
