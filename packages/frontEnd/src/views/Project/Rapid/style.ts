import styled from 'styled-components'

export const RapidStyled = styled.div`
  display: flex;
  height: calc(100vh - 90px);

  .page-select {
    width: 180px;
    box-shadow: -10px 10px 12px;

    .add {
      margin: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .add-text {
        font-size: 14px;
      }
    }

    .page {
      height: calc(100% - 44px);
      overflow-y: scroll;

      .page-item {
        padding: 10px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .page-item-name {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .ant-tag {
            font-size: 10px;
          }
        }

        .settingOutlined {
          visibility: hidden;
        }

        &:hover {
          background-color: #f2f2f2;
          cursor: pointer;

          .settingOutlined {
            visibility: visible;
          }
        }
      }

      .page-active,
      .page-active:hover {
        background-color: #edf4fe;
      }
    }
  }

  .page-preview {
    margin: 16px;
    width: 100%;
    background-color: #fff;
  }
`
