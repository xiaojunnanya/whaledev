import styled from 'styled-components'

export const ActionModalStyled = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.defaultColor.grey};
  border-radius: 8px;

  .menuAction {
    width: 200px;
    height: calc(100vh - 250px);
    overflow: auto;
    border-right: 1px solid ${props => props.theme.defaultColor.grey};
    ul,
    li {
      list-style: none;
    }
    .category {
      line-height: 32px;
      font-size: 14px;
      font-weight: 500;
      background-color: ${props => props.theme.defaultColor.grey};
      .navTitle {
        padding-left: 10px;
      }
      .subItem {
        line-height: 32px;
        background-color: ${props => props.theme.defaultColor.white};
        padding-left: 30px;
        font-weight: normal;
        cursor: pointer;
        &:hover {
          color: ${props => props.theme.primaryColor[700]};
        }
      }
      .checked {
        color: ${props => props.theme.primaryColor[700]};
      }
    }
  }
  .content {
    flex: 1;
    padding: 20px;

    &-text {
      text-align: center;
      line-height: 300px;
    }
  }
`
