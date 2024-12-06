import { memo } from 'react'
import { DescribeStyled } from './style'

interface IProps {
  children?: React.ReactNode
}

export default memo((props: IProps) => {
  const { children } = props

  return (
    <DescribeStyled>
      <h3 className="title">说明</h3>
      <div className="describe">{children}</div>
      <hr className="hr" />
    </DescribeStyled>
  )
})
