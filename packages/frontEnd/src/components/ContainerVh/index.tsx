import { memo } from 'react'
import { ContainerStyled } from './style'
import { Flex, Spin } from 'antd'

interface IProps {
  children: React.ReactNode
  height?: number
  isLoading?: boolean
  isSetHeight?: boolean
}

export default memo((props: IProps) => {
  // 遗留的问题：这个高度？？？
  const { children, height = 0, isLoading = false, isSetHeight = false } = props
  return (
    <Flex gap="middle" vertical>
      <Spin tip="加载中..." spinning={isLoading}>
        <ContainerStyled height={height} isSetHeight={isSetHeight}>
          {children}
        </ContainerStyled>
      </Spin>
    </Flex>
  )
})
