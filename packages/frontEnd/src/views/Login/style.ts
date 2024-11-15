import styled from 'styled-components'

import login_bg from '@/assets/images/png/login_bg.png'
import login_img from '@/assets/images/png/login_img.png'

export const LoginStyled = styled.div`
  .login-body {
    height: 100vh;
    background-size: cover;
    background-image: url(${login_bg});
    display: flex;

    .bg {
      flex: 1;
      background-size: cover;
      background-position: center;
      background-size: 800px;
      background-repeat: no-repeat;
      background-image: url(${login_img});
    }

    .login-panel {
      width: 430px;
      margin-right: 10%;
      margin-top: 8%;

      .checkCode {
        display: flex;

        img {
          margin-left: 10px;
          border-radius: 1px;
        }
      }

      .emailCode {
        display: flex;
      }
    }
  }
`
