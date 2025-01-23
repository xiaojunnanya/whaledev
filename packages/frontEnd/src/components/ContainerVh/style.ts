import styled from 'styled-components'

interface IContainer {
  height: number
  isSetHeight: boolean
}

export const ContainerStyled = styled.div<IContainer>`
  overflow-y: auto;
  max-height: ${props => `calc(100vh - ${props.height}px)`};
  height: ${props =>
    props.isSetHeight ? `calc(100vh - ${props.height}px)` : 'auto'};
`
