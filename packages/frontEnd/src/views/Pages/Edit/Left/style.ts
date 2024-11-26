import styled from 'styled-components'

export const LeftStyled = styled.div`
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

  .edit-left-side {
    position: absolute;
    height: 100%;
    width: 298px;
    background-color: ${props => props.theme.defaultColor.white};
    border-left: 1px solid ${props => props.theme.defaultColor.grey};
    border-right: 1px solid ${props => props.theme.defaultColor.grey};
    left: 48px;

    .side-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      height: 48px;

      &-title {
        font-weight: 700;
      }

      &-right {
        display: flex;
        align-items: center;

        img {
          cursor: pointer;
        }

        > span {
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
`
