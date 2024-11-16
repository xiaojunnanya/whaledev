import styled from 'styled-components'

export const ProjectStyled = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    margin: 15px 30px;

    .ant-input-outlined {
      width: 200px;
    }
  }

  .content {
    padding: 10px 30px;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 48px - 62px - 20px - 72px);

    .otherinfo {
      .typestate {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .type {
          border: 1px solid #ccc;
          font-size: 12px;
          padding: 2px 5px;
          border-radius: 5px;
        }
      }
    }

    .ant-pagination {
      display: flex;
      justify-content: flex-end;
      margin: 20px;
    }
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
`
