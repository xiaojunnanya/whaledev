import { memo } from 'react'
import { Spin } from 'antd'
import { LoadingStyled } from './style.ts'

export default memo(() => {
  return (
    <LoadingStyled>
      <Spin size="large" />
    </LoadingStyled>
  )
})
