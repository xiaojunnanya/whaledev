import styled from 'styled-components'

interface IContainer {
  height: number
}

export const ContainerStyled = styled.div<IContainer>`
  overflow-y: auto;
  height: ${props => `calc(100vh - ${props.height}px)`};
`
