import styled from 'styled-components'

export const FileNameListStyled = styled.div`
  display: flex;
  align-items: center;

  height: 38px;
  overflow-x: auto;
  overflow-y: hidden;
  border-bottom: 1px solid ${props => props.theme.defaultColor.grey};
  box-sizing: border-box;
  background-color: ${props => props.theme.defaultColor.white};
  white-space: nowrap;

  .tab-item {
    display: inline-flex;
    padding: 8px 10px 6px;
    font-size: 13px;
    line-height: 20px;
    cursor: pointer;
    align-items: center;
    border-bottom: 3px solid transparent;

    &.actived {
      border-bottom: 3px solid ${props => props.theme.primaryColor[700]};
    }
  }

  .add {
    cursor: pointer;
  }
`
