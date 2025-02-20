import { memo } from 'react'
import { Spin } from 'antd'
import { LoadingStyled } from './style.ts'

interface IProps {
  isBigLoading?: boolean
}

export default memo((props: IProps) => {
  const { isBigLoading = false } = props

  return (
    <LoadingStyled
      style={{
        height: isBigLoading ? '100vh' : '40vh',
      }}
    >
      <Spin size="large" />
    </LoadingStyled>
  )
})
