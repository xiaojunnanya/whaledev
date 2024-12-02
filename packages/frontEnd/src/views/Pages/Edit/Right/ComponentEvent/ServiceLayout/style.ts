import styled from 'styled-components'

export const ServiceLayoutStyled = styled.div`
  .viewer {
    width: auto;
    height: calc(100vh - 65px);
    margin: -24px;
    background-color: ${props => props.theme.defaultColor.grey};
    cursor: grab;
  }
`
