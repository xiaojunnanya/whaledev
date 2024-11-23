import styled from 'styled-components'

export const FileNameListStyled = styled.div`
  display: flex;
  align-items: center;

  height: 38px;
  overflow-x: auto;
  overflow-y: hidden;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  color: #444;
  background-color: #fff;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 3px;
  }

  /* &::-webkit-scrollbar-track {
    background-color: #ddd;
  } */

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
  }

  .tab-item {
    display: inline-flex;
    padding: 8px 10px 6px;
    font-size: 13px;
    line-height: 20px;
    cursor: pointer;
    align-items: center;
    border-bottom: 3px solid transparent;

    &.actived {
      border-bottom: 3px solid ${props => props.theme.color.primaryColor};
    }
  }

  .add {
    cursor: pointer;
  }
`
