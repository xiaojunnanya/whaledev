import styled from 'styled-components'

interface IContainer {
  height: number
  $isHeight: 'true' | 'false'
}

export const ContainerStyled = styled.div<IContainer>`
  overflow-y: auto;
  max-height: ${props => `calc(100vh - ${props.height}px)`};
  height: ${props =>
    props.$isHeight === 'true' ? `calc(100vh - ${props.height}px)` : 'auto'};
`
