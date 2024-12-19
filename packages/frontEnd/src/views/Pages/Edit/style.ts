import styled from 'styled-components'

export const ContentStyled = styled.div`
  display: flex;
  height: calc(100vh - 90px);
  position: relative;
  background-color: ${props => props.theme.defaultColor.grey};

  .edit {
    &-left {
      width: 48px;
      background-color: ${props => props.theme.defaultColor.white};
    }

    &-middle {
      flex: 1;
      margin: 16px 7px 16px 16px;

      .edit-middle-content {
        overflow: auto;
        height: 100%;
        position: relative;
        background-color: ${props => props.theme.defaultColor.white};

        left: 50%;
        transform: translateX(-50%);
      }
    }

    &-right {
      width: 300px;
      background-color: ${props => props.theme.defaultColor.white};
    }
  }

  .left-aside {
    height: 100%;
    /* width: 298px; */
    background-color: ${props => props.theme.defaultColor.white};
    border-left: 1px solid ${props => props.theme.defaultColor.grey};
    border-right: 1px solid ${props => props.theme.defaultColor.grey};
    left: 48px;
    z-index: 999;

    .side-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      height: 40px;

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

  .right-dot {
    height: 100%;
    display: flex;
    align-items: center;

    .dot {
      padding: 15px 0px;
      border-radius: 12px 0px 0px 12px;
      background: ${props => props.theme.defaultColor.white};
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
`
