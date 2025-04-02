import styled from 'styled-components'

export const LoadingStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.whiteOpacity[1]};
`
