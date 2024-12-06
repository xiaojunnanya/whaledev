import styled from 'styled-components'

export const ComponentEventStyled = styled.div`
  .addAction {
    font-size: 12px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    padding: 4px 0;
    cursor: pointer;
  }

  .deleteAction {
    &:hover {
      color: ${props => props.theme.primaryColor[700]};
    }
  }
`
