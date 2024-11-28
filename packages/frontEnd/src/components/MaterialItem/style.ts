import styled from 'styled-components'

export const MaterialItemStyled = styled.div`
  height: 30px;
  line-height: 30px;
  border: 1px solid ${props => props.theme.defaultColor.grey2};
  border-radius: 5px;
  text-align: center;
  cursor: grab;
  margin: 10px;

  &:hover {
    border: 1px solid ${props => props.theme.primaryColor[700]};
    color: ${props => props.theme.primaryColor[700]};
  }
`
