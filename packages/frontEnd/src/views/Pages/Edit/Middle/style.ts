import styled from 'styled-components'

export const MiddleStyled = styled.div`
  background-color: ${props => props.theme.defaultColor.grey};
  padding: 16px;

  .edit-middle-container {
    height: 100%;
    background-color: ${props => props.theme.defaultColor.white};
  }
`
