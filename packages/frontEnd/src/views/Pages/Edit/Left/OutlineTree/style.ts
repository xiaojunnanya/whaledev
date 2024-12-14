import styled from 'styled-components'

export const OutlineTreeStyled = styled.div`
  overflow: auto;
  height: calc(100% - 48px);
`

export const TreeTitleStyled = styled.div`
  & > span {
    margin-right: 10px;
  }

  & > span:last-child {
    margin-right: 0;
  }
`
