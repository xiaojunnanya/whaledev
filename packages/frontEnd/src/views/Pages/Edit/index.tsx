import { memo } from 'react'
import { ContentStyled } from './style'
import Left from './Left'
import Middle from './Middle'
import Right from './Right'

export default memo(() => {
  return (
    <ContentStyled>
      <Left></Left>
      <Middle></Middle>
      <Right></Right>
    </ContentStyled>
  )
})
