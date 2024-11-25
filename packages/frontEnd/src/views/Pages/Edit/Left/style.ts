import styled from 'styled-components'

export const LeftStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;

  img {
    width: 20px;
    height: 20px;
    margin-bottom: 6px;
  }

  .edit-left-item {
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

  .edit-left-bottom {
    /* margin-bottom: 12px; */
  }
`
