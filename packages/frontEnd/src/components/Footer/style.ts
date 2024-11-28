import styled from 'styled-components'

export const FooterStyle = styled.div`
  width: 100%;
  background-color: ${props => props.theme.defaultColor.black};

  .footer {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;

    dt {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 16px;
      color: ${props => props.theme.defaultColor.white};
    }

    dd {
      margin-left: 0;
      color: rgb(235, 237, 240);
      margin-top: 10px;
      cursor: pointer;
      font-size: 14px;
    }
  }
`
