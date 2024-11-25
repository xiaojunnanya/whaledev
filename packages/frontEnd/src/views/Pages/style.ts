import styled from 'styled-components'

export const EditStyled = styled.div`
  .edit-top {
    height: 41px;
    padding: 0 20px;
    border-bottom: 1px solid ${props => props.theme.defaultColor.grey};

    display: flex;
    align-items: center;
    justify-content: space-between;

    &-left {
      cursor: pointer;
      .page-name {
        margin-left: 10px;
        font-size: 13px;
      }
    }

    &-middle {
      display: flex;

      .anticon {
        width: 32px;
        height: 32px;
        text-align: center;
        display: inline-block;
        line-height: 32px;
        font-size: 18px;
        margin: 0 5px;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: ${props => props.theme.defaultColor.grey};
        }
      }

      .ant-input-number-group-wrapper {
        margin-left: 20px;
        width: 120px;
      }
    }

    &-right {
      button {
        margin-left: 10px;
      }
    }
  }
`
