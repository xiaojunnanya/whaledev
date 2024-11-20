import { memo } from 'react'
import { ContainerStyled } from './style'
import { Flex, Spin } from 'antd'

interface IProps {
  children: React.ReactNode
  height?: number
  isLoading?: boolean
}

export default memo((props: IProps) => {
  // 遗留的问题：这个高度？？？
  const { children, height = 48, isLoading = false } = props
  return (
    <Flex gap="middle" vertical>
      <Spin tip="Loading..." spinning={isLoading}>
        <ContainerStyled height={150}>{children}</ContainerStyled>
      </Spin>
    </Flex>
  )
})
