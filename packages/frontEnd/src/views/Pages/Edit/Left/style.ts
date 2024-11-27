import styled from 'styled-components'

export const EditLeftStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: relative;

  .anticon {
    font-size: 16px;
  }

  .edit-left-item {
    font-size: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 16px 0;
    padding: 4px;
    border-radius: 4px;
    user-select: none;
  }

  .edit-left-active {
    background-color: ${props => props.theme.defaultColor.grey};
    color: ${props => props.theme.primaryColor[700]};
  }

  .edit-left-top {
    &-item {
      &:hover {
        background-color: ${props => props.theme.defaultColor.grey};
      }
    }
  }
`
