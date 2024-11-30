import styled from 'styled-components'

export const RightStyled = styled.div`
  .whale-segmented {
    margin-bottom: 10px;
  }

  .whale-right-title {
    background: ${props => props.theme.defaultColor.grey};
    font-size: 14px;
    padding: 0 10px;
    line-height: 30px;
    border-left: 1px solid ${props => props.theme.defaultColor.white};
    margin-bottom: 24px;
  }

  .whale-props-noselect {
    text-align: center;
    font-size: 12px;
    margin-top: 50px;
  }
`
