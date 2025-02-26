import styled from 'styled-components'

export const LoginStyled = styled.div`
  .container {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: #f5f5f5;
    color: black;
  }

  .top-right {
    display: flex;
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .login-box {
    width: 300px;
    height: 290px;
    padding: 30px;
    border-radius: 5px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
  }

  .logo-container {
    padding-bottom: 30px;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-image {
    margin-right: 8px;
    object-fit: contain;
    width: 30px;
    height: 30px;
  }

  .login-title {
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .styled-button {
    width: 100%;
    margin-top: 5px;
    border-radius: 5px;
    letter-spacing: 2px;
  }
`
