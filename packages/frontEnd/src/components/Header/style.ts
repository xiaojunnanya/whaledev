import styled from 'styled-components'

export const HeaderStyle = styled.header`
  height: 48px;

  .head-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    height: inherit;
    color: ${props => props.theme.defaultColor.black};

    background-color: ${props => props.theme.defaultColor.white};

    padding: 0 20px;
    box-shadow: 0 0 10px ${props => props.theme.blackOpacity[1]};

    .logo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      h1 {
        font-size: 20px;
        font-weight: 700;
      }

      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }

    .head-right {
      display: flex;
      align-items: center;
      user-select: none;
      /* width: 221px; */
      justify-content: flex-end;

      & > div {
        margin: 0 5px;
      }

      .userInfo,
      .docs,
      .github {
        cursor: pointer;
      }

      .github {
        cursor: pointer;
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }
`
