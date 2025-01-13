import styled from 'styled-components'

export const DataSourceStyled = styled.div`
  .btnGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.defaultColor.grey};
    margin: 5px 0;
  }
`
