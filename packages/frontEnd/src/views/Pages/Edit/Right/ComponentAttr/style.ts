import styled from 'styled-components'

export const ComponentAttrStyled = styled.div`
  margin-top: 10px;
  .whale-attr {
    &-title {
      background: ${props => props.theme.defaultColor.grey};
      font-size: 14px;
      padding: 0 10px;
      line-height: 30px;
      border-left: 1px solid ${props => props.theme.defaultColor.white};
      margin-bottom: 24px;
    }
  }
`
