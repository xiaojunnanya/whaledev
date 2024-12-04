import styled from 'styled-components'

export const ActionModalStyled = styled.div`
  display: flex;
  border: 1px solid #e8e9eb;
  border-radius: 8px;
  margin-top: 15px;

  .menuAction {
    width: 200px;
    height: 500px;
    overflow: auto;
    border-right: 1px solid #e8e9eb;
    ul,
    li {
      list-style: none;
    }
    .category {
      line-height: 32px;
      font-size: 14px;
      font-weight: 500;
      background-color: #f5f5f5;
      .navTitle {
        padding-left: 10px;
      }
      .subItem {
        line-height: 32px;
        background-color: #fff;
        padding-left: 30px;
        font-weight: normal;
        cursor: pointer;
        &:hover {
          color: ${props => props.theme.color.primaryColor};
        }
      }
      .checked {
        color: ${props => props.theme.color.primaryColor};
      }
    }
  }
  .content {
    flex: 1;
    padding: 20px;
    .desc {
      .descTitle {
        font-size: 14px;
      }
      .descInfo {
        font-size: 12px;
        color: #5c5f66;
      }
    }

    &-text {
      text-align: center;
      line-height: 300px;
    }
  }
`
