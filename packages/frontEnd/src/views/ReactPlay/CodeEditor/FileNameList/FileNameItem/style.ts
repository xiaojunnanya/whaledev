import styled from 'styled-components'

export const FileNameItemStyled = styled.div`
  .tabs-item-input {
    width: 90px;
    padding: 4px 0 4px 10px;
    font-size: 13px;

    background-color: ${props => props.theme.defaultColor.grey};
    border: 1px solid ${props => props.theme.defaultColor.grey};
    border-radius: 4px;
    outline: none;
  }
`
